import { Link } from "react-router-dom";
import guard from "../assets/guard-hero.webp";
import factory from "../assets/factory.webp";
import Button from "../components/Button";
import Icon from "../components/Icon";
import ServiceCard from "../components/ServiceCard";
import { CTA, Process, FAQ } from "../components/SharedSections";
import { services } from "../data/services";
export default function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src={guard}
          alt="Professional security guards at a modern building entrance"
          fetchPriority="high"
          data-parallax
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="eyebrow light">
            <span className="small-line" /> CONFIDENCE AT EVERY CHECKPOINT
          </div>
          <h1>
            Your world.
            <br />
            Our watch.
          </h1>
          <p>
            Professional security. Personal commitment.
            <br />
            Protecting your people, your spaces, and
            <br className="desktop-break" /> everything you've worked to build.
          </p>
          <div className="hero-actions">
            <Button to="/hireguard" />
            <Link to="/services" className="text-button">
              Explore our services <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="hero-promise">
            <Icon name="shield" size={18} />
            <span>A strong presence. A calmer mind.</span>
          </div>
        </div>
        <div className="hero-caption">
          <span className="live-dot" /> PEOPLE FIRST.
          <br />
          <strong>PROTECTION ALWAYS.</strong>
        </div>
        <div className="hero-bottom">
          <div className="container">
            <span>RESIDENTIAL · INDUSTRIAL · COMMERCIAL</span>
            <a href="#services">
              DISCOVER BSDS <span>↓</span>
            </a>
          </div>
        </div>
      </section>
      <section className="assurance">
        <div className="container">
          {[
            ["shield", "Purposeful protection", "Built around your priorities"],
            [
              "people",
              "People you can count on",
              "Professional. Present. Approachable.",
            ],
            ["clock", "Coverage that fits", "Your space. Your schedule."],
          ].map(([icon, title, copy]) => (
            <div key={title}>
              <span className="assurance-icon">
                <Icon name={icon} size={25} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section" id="services">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">OUR SECURITY SOLUTIONS</div>
              <h2>
                Different spaces.
                <br />
                The same commitment.
              </h2>
            </div>
            <div>
              <p>
                Wherever life and work happen, we're here to help you feel
                secure.
              </p>
              <Link to="/services" className="inline-link">
                Explore all services <Icon name="diagonal" size={18} />
              </Link>
            </div>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard service={service} key={service.slug} />
            ))}
          </div>
        </div>
      </section>
      <section className="why-section">
        <div className="container why-layout">
          <div className="why-photo reveal">
            <img
              src={factory}
              alt="Two professional security guards walking through an industrial site"
              loading="lazy"
            />
            <div className="photo-note">
              <Icon name="shield" size={35} />
              <span>
                More than a uniform.
                <br />
                <strong>A commitment to you.</strong>
              </span>
            </div>
          </div>
          <div className="why-copy reveal">
            <div className="eyebrow">THE BSDS DIFFERENCE</div>
            <h2>
              Security is a job.
              <br />
              <span>Trust is a responsibility.</span>
            </h2>
            <p>
              Anyone can stand at a gate. The difference is in the attention,
              the approach, and the people behind the uniform.
            </p>
            <div className="why-features">
              {[
                [
                  "01",
                  "Professional presence",
                  "A reassuring first impression for visitors. A watchful eye for your people.",
                ],
                [
                  "02",
                  "Designed for your everyday",
                  "Security that understands your space, your routines, and your priorities.",
                ],
                [
                  "03",
                  "Clear from day one",
                  "Defined responsibilities and open communication at every step.",
                ],
              ].map(([n, title, copy]) => (
                <div key={n}>
                  <span>{n}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button to="/about" variant="outline">
              Get to know BSDS
            </Button>
          </div>
        </div>
      </section>
      <Process />
      <FAQ />
      <CTA />
    </>
  );
}
