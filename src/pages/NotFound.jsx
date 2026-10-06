import Button from "../components/Button";
export default function NotFound() {
  return (
    <section className="page-intro not-found">
      <div className="container">
        <span className="eyebrow">404 / WRONG TURN</span>
        <h1>
          Let's get you
          <br />
          back to safety.
        </h1>
        <p>The page you're looking for isn't here.</p>
        <Button to="/">Back to home</Button>
      </div>
    </section>
  );
}
