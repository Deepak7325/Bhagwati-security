import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import guardImage from "../assets/guard-hero.webp";


const services = [
  {
    id: "housing",
    title: "Housing guards",
    description: "Homes & communities",
    symbol: "⌂",
  },
  {
    id: "factory",
    title: "Factory guards",
    description: "Factories & warehouses",
    symbol: "▥",
  },
  {
    id: "commercial",
    title: "Commercial & more",
    description: "Offices, retail & events",
    symbol: "◇",
  },
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  company: "",
  city: "",
  guards: "1",
  coverage: "Day shift",
  startDate: "",
  address: "",
  notes: "",
};

export default function HireGuard() {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get("service");

  const [service, setService] = useState(() =>
    services.some((item) => item.id === requestedService)
      ? requestedService
      : "housing",
  );

  const [form, setForm] = useState(initialForm);
  const [isReview, setIsReview] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const sendingRef = useRef(false);
  const formHeadingRef = useRef(null);
  const reviewHeadingRef = useRef(null);
  const successHeadingRef = useRef(null);
  const previousScreen = useRef("form");

  const selectedService = services.find((item) => item.id === service);

  const today = new Date();
  const minimumDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  useEffect(() => {
    const screen = submitted ? "success" : isReview ? "review" : "form";

    if (screen !== previousScreen.current) {
      const heading =
        screen === "success"
          ? successHeadingRef.current
          : screen === "review"
            ? reviewHeadingRef.current
            : formHeadingRef.current;

      heading?.focus();
      previousScreen.current = screen;
    }
  }, [isReview, submitted]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleReview(event) {
    event.preventDefault();
    setSubmitError("");
    setIsReview(true);
  }

  async function submitEnquiry() {
    if (sendingRef.current || submitted) return;

    sendingRef.current = true;
    setSending(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          service,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.ok !== true) {
        throw new Error(
          result?.error ||
            "We could not confirm submission. Please try again later.",
        );
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof TypeError
          ? "Unable to confirm submission. Check your connection and try again later."
          : error.message || "Something went wrong. Please try again later.",
      );
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }

  function startNewEnquiry() {
    setForm({ ...initialForm });
    setService("housing");
    setSubmitError("");
    setSubmitted(false);
    setIsReview(false);
  }

  const summary = [
    ["Full name", form.name],
    ["Phone number", form.phone],
    ["Email address", form.email],
    ["Company / society", form.company],
    ["City / area", form.city],
    ["Number of guards", form.guards],
    ["Coverage", form.coverage],
    ["Preferred start date", form.startDate],
    ["Site address", form.address],
    ["Additional details", form.notes],
  ];

  return (
    <div className="hire-page">
      <section className="hire-banner">
        <div className="hire-container">
          <span className="hire-eyebrow">PROTECTION STARTS HERE</span>

          <h1>
            Your people. Your place.
            <br />
            <span>Our commitment.</span>
          </h1>

          <p>
            Tell us what you need. Let’s take the first step toward a safer,
            more confident everyday.
          </p>
        </div>
      </section>

      <section className="hire-main">
        <div className="hire-container hire-layout">
          <aside className="hire-sidebar">
            <div className="hire-photo">
              <img
                src={guardImage}
                alt="Professional security guard at a building entrance"
              />

              <div className="hire-photo-caption">
                <span className="hire-caption-line" />

                <p>
                  A strong presence.
                  <br />
                  <strong>A personal commitment.</strong>
                </p>
              </div>
            </div>

            <div className="hire-sidebar-content">
              <span className="hire-eyebrow">A SIMPLE WAY FORWARD</span>

              {[
                [
                  "01",
                  "Choose your protection",
                  "Find the service that fits your space.",
                ],
                [
                  "02",
                  "Share your requirements",
                  "Tell us where, when, and what you need.",
                ],
                [
                  "03",
                  "Send your enquiry",
                  "Review your details and send them to our team.",
                ],
              ].map(([number, title, description]) => (
                <div className="hire-step" key={number}>
                  <span>{number}</span>

                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              ))}

              <p className="hire-sidebar-note">
                Not sure how many guards you need? Select “Need guidance”
                and describe your property.
              </p>
            </div>
          </aside>

          <div className="hire-panel">
            <div
              className="hire-progress"
              aria-label={
                submitted
                  ? "Enquiry submitted"
                  : `Step ${isReview ? 2 : 1} of 2`
              }
            >
              <span className={!isReview ? "is-active" : "is-complete"}>
                <b>01</b>
                Your requirements
              </span>

              <span
                className={
                  submitted ? "is-complete" : isReview ? "is-active" : ""
                }
              >
                <b>{submitted ? "✓" : "02"}</b>
                Review & submit
              </span>
            </div>

            {submitted ? (
              <div className="hire-success">
                <span className="hire-success-icon" aria-hidden="true">
                  ✓
                </span>

                <span className="hire-eyebrow">THANK YOU FOR REACHING OUT</span>

                <h2 ref={successHeadingRef} tabIndex={-1}>
                  Your enquiry is on its way.
                </h2>

                <p>
                  Your security requirements have been submitted to our team.
                  We’ll use the contact details you provided to respond.
                </p>

                <div className="hire-success-details">
                  <span>Selected service</span>
                  <strong>{selectedService.title}</strong>

                  <span>Your contact email</span>
                  <strong>{form.email}</strong>
                </div>

                <button
                  className="hire-button"
                  type="button"
                  onClick={startNewEnquiry}
                >
                  Start another enquiry
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            ) : !isReview ? (
              <form className="hire-form" onSubmit={handleReview}>
                <div className="hire-form-heading">
                  <span className="hire-eyebrow">
                    SECURITY BUILT AROUND YOU
                  </span>

                  <h2 ref={formHeadingRef} tabIndex={-1}>
                    Hire your guard.
                  </h2>

                  <p>Fields marked * are required.</p>
                </div>

                <fieldset className="hire-fieldset">
                  <legend>01 — What would you like to protect?</legend>

                  <div className="hire-service-options">
                    {services.map((item) => (
                      <label
                        key={item.id}
                        className={`hire-service-option ${
                          service === item.id ? "is-selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={item.id}
                          checked={service === item.id}
                          onChange={() => setService(item.id)}
                        />

                        <span
                          className="hire-service-icon"
                          aria-hidden="true"
                        >
                          {item.symbol}
                        </span>

                        <strong>{item.title}</strong>
                        <small>{item.description}</small>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="hire-fieldset">
                  <legend>02 — Your contact details</legend>

                  <div className="hire-fields">
                    <label>
                      Full name *
                      <input
                        name="name"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        pattern={".*\\S.*"}
                        maxLength={100}
                      />
                    </label>

                    <label>
                      Phone number *
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        minLength={7}
                        maxLength={24}
                        pattern={
                          "\\+?[0-9][0-9\\s\\(\\)\\-\\.]{5,22}[0-9]"
                        }
                        title="Enter a phone number beginning and ending with a digit. An initial +, spaces, brackets, dots, and hyphens are allowed."
                      />
                    </label>

                    <label>
                      Email address *
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        maxLength={150}
                      />
                    </label>

                    <label>
                      Company / society <small>(optional)</small>
                      <input
                        name="company"
                        autoComplete="organization"
                        placeholder="Company or community name"
                        value={form.company}
                        onChange={handleChange}
                        maxLength={150}
                      />
                    </label>
                  </div>
                </fieldset>

                <fieldset className="hire-fieldset">
                  <legend>03 — Your security requirements</legend>

                  <div className="hire-fields">
                    <label>
                      City / area *
                      <input
                        name="city"
                        autoComplete="address-level2"
                        placeholder="Where do you need security?"
                        value={form.city}
                        onChange={handleChange}
                        required
                        pattern={".*\\S.*"}
                        maxLength={120}
                      />
                    </label>

                    <label>
                      Number of guards *
                      <select
                        name="guards"
                        value={form.guards}
                        onChange={handleChange}
                        required
                      >
                        {[
                          "1",
                          "2",
                          "3–5",
                          "6–10",
                          "10+",
                          "Need guidance",
                        ].map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Coverage needed *
                      <select
                        name="coverage"
                        value={form.coverage}
                        onChange={handleChange}
                        required
                      >
                        {[
                          "Day shift",
                          "Night shift",
                          "24-hour coverage",
                          "Event / temporary",
                          "Need guidance",
                        ].map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Preferred start date <small>(optional)</small>
                      <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        min={minimumDate}
                      />
                    </label>

                    <label className="hire-full-width">
                      Site address <small>(optional)</small>
                      <input
                        name="address"
                        autoComplete="street-address"
                        placeholder="Building, street, or locality"
                        value={form.address}
                        onChange={handleChange}
                        maxLength={250}
                      />
                    </label>

                    <label className="hire-full-width">
                      Anything else we should know? <small>(optional)</small>
                      <textarea
                        name="notes"
                        rows={4}
                        placeholder="Shift timings, access points, event dates, or specific concerns…"
                        value={form.notes}
                        onChange={handleChange}
                        maxLength={1500}
                      />
                    </label>
                  </div>
                </fieldset>

                <div className="hire-form-actions">
                  <p>No payment required to send an enquiry.</p>

                  <button className="hire-button" type="submit">
                    Review your enquiry
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>

                <p className="hire-privacy-note">
                  Your details will be emailed to our team when you submit.
                  We’ll use them to respond to your security requirements.
                </p>
              </form>
            ) : (
              <div className="hire-review">
                <span className="hire-eyebrow">ONE LAST LOOK</span>

                <h2 ref={reviewHeadingRef} tabIndex={-1}>
                  Review your enquiry.
                </h2>

                <p>
                  Check your details below, then submit your enquiry to
                  our team.
                </p>

                <div className="hire-selected-service">
                  <span aria-hidden="true">{selectedService.symbol}</span>

                  <div>
                    <small>YOUR SELECTED SERVICE</small>
                    <h3>{selectedService.title}</h3>
                  </div>
                </div>

                <dl className="hire-summary">
                  {summary
                    .filter(([, value]) => value)
                    .map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                </dl>

                <div
                  className="hire-review-actions"
                  aria-busy={sending}
                >
                  <button
                    className="hire-button hire-button-outline"
                    type="button"
                    disabled={sending}
                    onClick={() => {
                      setSubmitError("");
                      setIsReview(false);
                    }}
                  >
                    ← Edit details
                  </button>

                  <button
                    className="hire-button"
                    type="button"
                    disabled={sending}
                    onClick={submitEnquiry}
                  >
                    {sending ? (
                      <>
                        <span
                          className="hire-spinner"
                          aria-hidden="true"
                        />
                        Sending enquiry…
                      </>
                    ) : (
                      <>
                        Submit enquiry
                        <span aria-hidden="true">↗</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="hire-send-status" role="status">
                  {sending
                    ? "Sending your enquiry. Please keep this page open."
                    : ""}
                </p>

                {submitError && (
                  <p className="hire-submit-error" role="alert">
                    {submitError}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}