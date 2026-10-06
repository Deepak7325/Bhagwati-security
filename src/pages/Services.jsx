import { useState } from "react";
import { services } from "../data/services";
import ServiceCard from "../components/ServiceCard";
import { CTA, FAQ } from "../components/SharedSections";
export default function Services() {
  const [filter, setFilter] = useState("all");
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <span className="eyebrow">OUR SERVICES / YOUR PEACE OF MIND</span>
          <h1>
            The right protection.
            <br />
            <span>For your kind of world.</span>
          </h1>
          <p>
            From the place you call home to the business you're building.
            <br />
            Find security that fits naturally into your everyday.
          </p>
        </div>
      </section>
      <section className="section services-page">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter services">
            {[
              ["all", "All services"],
              ["housing", "Residential"],
              ["factory", "Industrial"],
              ["commercial", "Commercial & events"],
            ].map(([value, label]) => (
              <button
                key={value}
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="service-grid" aria-live="polite">
            {services
              .filter((s) => filter === "all" || s.slug === filter)
              .map((s) => (
                <ServiceCard service={s} key={s.slug} />
              ))}
          </div>
        </div>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}
