import Button from "./Button";
import Icon from "./Icon";
export function CTA() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <div className="eyebrow">YOUR NEXT STEP TO A SAFER SPACE</div>
          <h2>
            Good security.
            <br />
            <span>Great peace of mind.</span>
          </h2>
        </div>
        <div>
          <p>
            Tell us what matters to you.
            <br />
            Let's build protection around it.
          </p>
          <Button to="hireguard"/>
        </div>
        <Icon className="cta-shield" name="shield" size={260} />
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section className="section process">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">A SIMPLE START. A STRONGER EVERYDAY.</div>
            <h2>
              Protection, without
              <br />
              the complications.
            </h2>
          </div>
          <p>
            From understanding your space to planning the right presence. Every
            detail has a purpose.
          </p>
        </div>
        <div className="process-grid">
          {[
            [
              "01",
              "Tell us what matters",
              "Share your location, priorities, and the kind of coverage you need.",
            ],
            [
              "02",
              "Build the right plan",
              "Define responsibilities, schedules, and a security approach for your space.",
            ],
            [
              "03",
              "Move forward with confidence",
              "Bring your plan to life with a clear point of contact and defined expectations.",
            ],
          ].map(([n, title, copy]) => (
            <article className="reveal" key={n}>
              <span className="step-number">
                {n}
                <Icon name="arrow" size={24} />
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function FAQ() {
  return (
    <section className="section faq">
      <div className="container faq-layout">
        <div>
          <div className="eyebrow">A FEW THINGS, ANSWERED</div>
          <h2>
            Clarity comes
            <br />
            with confidence.
          </h2>
        </div>
        <div>
          {[
            [
              "Which service is right for my property?",
              "Choose residential security for homes and communities, industrial security for factories and warehouses, or commercial security for offices, retail, and events. The detail pages explain each option.",
            ],
            [
              "Can security coverage fit my operating hours?",
              "Your preferred hours, shift patterns, and access needs can form the basis of a custom coverage plan.",
            ],
            [
              "What should I prepare before hiring?",
              "Start with your site type, location, main concerns, operating hours, and expected visitor or vehicle traffic. These details help define an appropriate scope.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
