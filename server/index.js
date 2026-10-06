import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import { fileURLToPath } from "node:url";
import { prepareEnquiry, validEmail } from "./enquiry.js";

dotenv.config({
  path: fileURLToPath(new URL("./.env", import.meta.url)),
});

const {
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  ENQUIRY_TO_EMAIL,
} = process.env;

const smtpPort = Number(process.env.SMTP_PORT || 587);
const sender = SMTP_FROM || SMTP_USER;

if (
  !SMTP_HOST ||
  !SMTP_USER ||
  !SMTP_PASS ||
  !validEmail(sender) ||
  !validEmail(ENQUIRY_TO_EMAIL) ||
  ![465, 587].includes(smtpPort)
) {
  throw new Error(
    "Complete the SMTP settings and receiving email in server/.env.",
  );
}

const allowedOrigins = new Set(
  (
    process.env.FRONTEND_ORIGINS ||
    "http://localhost:5173,http://127.0.0.1:5173"
  )
    .split(",")
    .map((origin) => origin.trim()),
);

const mailer = nodemailer.createTransport({
  host: SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  requireTLS: smtpPort !== 465,

  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

const app = express();

app.disable("x-powered-by");

app.use("/api/enquiries", (req, res, next) => {
  res.set("Cache-Control", "no-store");

  const origin = req.get("origin");

  if (origin && !allowedOrigins.has(origin)) {
    return res.status(403).json({
      error: "Request origin not allowed.",
    });
  }

  next();
});

app.use(
  "/api/enquiries",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-7",
    legacyHeaders: false,

    message: {
      error: "Too many enquiries. Please try again in 15 minutes.",
    },
  }),
);

app.post(
  "/api/enquiries",

  (req, res, next) => {
    if (!req.is("application/json")) {
      return res.status(415).json({
        error: "JSON is required.",
      });
    }

    next();
  },

  express.json({ limit: "16kb" }),

  async (req, res) => {
    let message;

    try {
      message = prepareEnquiry(
        req.body,
        ENQUIRY_TO_EMAIL,
        sender,
      );
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    try {
      const result = await mailer.sendMail(message);

      if (!result.accepted?.length || result.rejected?.length) {
        throw new Error("Recipient not accepted.");
      }

      return res.json({ ok: true });
    } catch (error) {
      // Avoid logging the customer's details or SMTP credentials.
      console.error(
        "Enquiry email failed:",
        error.code || "SMTP_ERROR",
      );

      return res.status(502).json({
        error:
          "We could not confirm submission. Please try again later.",
      });
    }
  },
);

app.use((error, req, res, next) => {
  const status =
    error.type === "entity.too.large"
      ? 413
      : error.type === "entity.parse.failed"
        ? 400
        : 500;

  res.status(status).json({
    error:
      status === 413
        ? "Enquiry is too large."
        : "Unable to process this request.",
  });
});

const port = Number(process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`Enquiry API listening on port ${port}`);
});
// Serve the built React website.
const frontendDirectory = fileURLToPath(
  new URL("../dist/", import.meta.url),
);

const frontendIndex = fileURLToPath(
  new URL("../dist/index.html", import.meta.url),
);

app.use(express.static(frontendDirectory));

// Allow React routes such as /services and /hireguard.
app.get(/^\/(?!api(?:\/|$)).*/, (req, res) => {
  res.sendFile(frontendIndex);
});