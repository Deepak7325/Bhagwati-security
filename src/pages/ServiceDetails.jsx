import { Link, useParams } from "react-router-dom";
import { services } from "../data/services";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { CTA, Process } from "../components/SharedSections";
import NotFound from "./NotFound";
export default function ServiceDetails() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <NotFound />;
  return (
    <>
      <section className="detail-hero">
        <div className="container detail-grid">
          <div>
            <Link to="/services" className="back-link">
              ← All services
            </Link>
            <div className="eyebrow">{service.category}</div>
            <h1>
              {service.title}
              <span>.</span>
            </h1>
            <p>{service.longDescription}</p>
            <Button />
          </div>
          <img src={service.image} alt={service.alt} />
        </div>
      </section>
      <section className="section">
        <div className="container detail-content">
          <div>
            <div className="eyebrow">A PLAN WITH PURPOSE</div>
            <h2>
              Attention where
              <br />
              it matters most.
            </h2>
            <p className="detail-audience">Ideal for: {service.audience}.</p>
          </div>
          <div className="detail-features">
            {service.features.map((feature, i) => (
              <div key={feature}>
                <Icon name="check" />
                <div>
                  <span className="eyebrow">0{i + 1} / COVERAGE</span>
                  <h3>{feature}</h3>
                </div>
              </div>
            ))}
            <p>
              Final responsibilities and coverage are agreed as part of your
              site-specific security plan.
            </p>
          </div>
        </div>
      </section>
      <Process />
      <CTA />
    </>
  );
}
