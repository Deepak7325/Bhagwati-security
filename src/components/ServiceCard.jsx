import { Link } from "react-router-dom";
import Icon from "./Icon";
export default function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <Link
        to={`/services/${service.slug}`}
        className="service-photo"
        aria-label={`Explore ${service.title}`}
      >
        <img src={service.image} alt={service.alt} loading="lazy" />
        <span className="photo-number">/{service.number}</span>
        <span className="photo-arrow">
          <Icon name="diagonal" />
        </span>
      </Link>
      <div className="service-body">
        <span className="eyebrow">{service.category}</span>
        <h3>
          <Link to={`/services/${service.slug}`}>{service.title}</Link>
        </h3>
        <p>{service.description}</p>
        <ul>
          {service.features.map((feature) => (
            <li key={feature}>
              <Icon name="check" size={14} />
              {feature}
            </li>
          ))}
        </ul>
        <a className="card-hire" href="/hireguard">
          Hire your guard
          <Icon name="diagonal" size={18} />
        </a>
      </div>
    </article>
  );
}
