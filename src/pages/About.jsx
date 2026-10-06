import guard from "../assets/guard-hero.webp";
import { CTA, Process } from "../components/SharedSections";
import Icon from "../components/Icon";
export default function About() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <div className="eyebrow">THE PEOPLE BEHIND YOUR PEACE OF MIND</div>
          <h1>
            Present in the moment.
            <br />
            <span>Committed to your world.</span>
          </h1>
          <p>
            Our approach is simple: understand what matters, show up with
            purpose,
            <br />
            and treat every responsibility with care.
          </p>
        </div>
      </section>
      <section className="section about-section">
        <div className="container">
          <div className="about-photo">
            <img
              src={guard}
              alt="Aegis-style security team at a commercial property"
            />
            <span>PROTECTION WITH A HUMAN TOUCH.</span>
          </div>
          <div className="about-story">
            <h2>
              Strong on security.
              <br />
              Grounded in people.
            </h2>
            <div>
              <p>
                Security should make a place feel more welcoming, more
                organized, and more secure. It starts with people who understand
                the responsibility of being there.
              </p>
              <p>
                Our service approach brings together a professional presence, a
                clear plan, and thoughtful communication. Because peace of mind
                comes from knowing what to expect.
              </p>
            </div>
          </div>
          <div className="values-grid">
            {[
              [
                "shield",
                "Integrity in every detail",
                "Clear expectations. Defined responsibilities. A straightforward approach to protecting your space.",
              ],
              [
                "people",
                "Respect at every interaction",
                "Professional security is as much about how people are treated as how a site is protected.",
              ],
              [
                "clock",
                "Attention, every day",
                "Your routines, access points, and changing needs belong at the center of the security plan.",
              ],
            ].map(([icon, title, copy]) => (
              <article key={title}>
                <Icon name={icon} size={30} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Process />
      <CTA />
    </>
  );
}
