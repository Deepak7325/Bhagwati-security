const services = {
  housing: "Housing guards",
  factory: "Factory guards",
  commercial: "Commercial & more",
};

const limits = {
  name: 100,
  phone: 24,
  email: 150,
  company: 150,
  city: 120,
  guards: 30,
  coverage: 40,
  startDate: 10,
  address: 250,
  notes: 1500,
};

export const validEmail = (value) =>
  typeof value === "string" &&
  value.length <= 254 &&
  /^[^\s@<>;,]+@[^\s@<>;,]+\.[^\s@<>;,]+$/.test(value);

export function prepareEnquiry(body, recipient, sender) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("Invalid enquiry.");
  }

  if (!Object.hasOwn(services, body.service)) {
    throw new Error("Choose a valid guard service.");
  }

  const data = {};

  for (const [key, maxLength] of Object.entries(limits)) {
    const value = body[key] ?? "";

    if (
      typeof value !== "string" ||
      value.length > maxLength ||
      (key !== "notes" && /[\r\n\x00]/.test(value))
    ) {
      throw new Error(`Invalid ${key}.`);
    }

    data[key] = value.trim();
  }

  if (!data.name || !data.city || !validEmail(data.email)) {
    throw new Error("Enter your name, city, and a valid email.");
  }

  const phoneDigits = data.phone.replace(/\D/g, "");

  if (
    !/^[+0-9() .-]+$/.test(data.phone) ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15
  ) {
    throw new Error("Enter a valid phone number.");
  }

  const guardOptions = ["1", "2", "3–5", "6–10", "10+", "Need guidance"];

  if (!guardOptions.includes(data.guards)) {
    throw new Error("Choose the number of guards.");
  }

  const coverageOptions = [
    "Day shift",
    "Night shift",
    "24-hour coverage",
    "Event / temporary",
    "Need guidance",
  ];

  if (!coverageOptions.includes(data.coverage)) {
    throw new Error("Choose a coverage option.");
  }

  if (
    data.startDate &&
    (
      !/^\d{4}-\d{2}-\d{2}$/.test(data.startDate) ||
      Number.isNaN(Date.parse(data.startDate)) ||
      new Date(data.startDate).toISOString().slice(0, 10) !== data.startDate
    )
  ) {
    throw new Error("Choose a valid start date.");
  }

  const labels = {
    name: "Name",
    phone: "Phone",
    email: "Email",
    company: "Company / society",
    city: "City / area",
    guards: "Guards required",
    coverage: "Coverage",
    startDate: "Preferred start date",
    address: "Site address",
    notes: "Additional details",
  };

  return {
    // These addresses come from your backend configuration.
    from: sender,
    to: recipient,

    // Clicking Reply in your inbox replies to the customer.
    replyTo: data.email,

    subject: `New security enquiry — ${services[body.service]}`,

    text: [
      "NEW SECURITY ENQUIRY",
      "",
      `Service: ${services[body.service]}`,
      ...Object.entries(labels).map(
        ([key, label]) => `${label}: ${data[key] || "Not provided"}`,
      ),
    ].join("\n"),
  };
}