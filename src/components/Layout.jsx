import { useEffect, useRef, useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import Button from "./Button";
import Icon from "./Icon";
import useMotion from "../hooks/useMotion";
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="BSDS Security home">
      <span className="brand-mark">
        <Icon name="shield" size={27} />
      </span>
      <span>
        Bhagwati Security
        <span className="brand-sub">And Detective Services</span>
      </span>
      <span className="registered">®</span>
    </Link>
  );
}
export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const header = useRef(null);
  const toggle = useRef(null);
  const page = useRef(null);
  useMotion(page, location.pathname);
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);
  useEffect(() => {
    const escape = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (e) => {
      if (!header.current?.contains(e.target)) setOpen(false);
    };
    const query = matchMedia("(min-width: 801px)");
    const close = () => setOpen(false);
    document.addEventListener("keydown", escape);
    document.addEventListener("click", outside);
    query.addEventListener("change", close);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("click", outside);
      query.removeEventListener("change", close);
    };
  }, [open]);
  return (
    <div ref={page}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="utility">
        <div className="container">
          <span>
            <i className="live-dot" /> PRESENT. PREPARED. PROTECTIVE.
          </span>
          <span>
            Security built around your world <Icon name="shield" size={13} />
          </span>
        </div>
      </div>
      <header className="site-header" ref={header}>
        <div className="container nav-inner">
          <Brand />
          <button
            className="menu-toggle"
            ref={toggle}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="main-nav"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
          <nav
            id="main-nav"
            className={open ? "open" : ""}
            aria-label="Main navigation"
          >
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/services">Our services</NavLink>
            <NavLink to="/about">Why BSDS</NavLink>
            <Button to="/hireguard" onClick={() => setOpen(false)} />
          </nav>
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <Brand />
              <p>
                A strong presence.
                <br />A safer everyday.
              </p>
            </div>
            <div>
              <span className="footer-label">EXPLORE</span>
              <Link to="/">Home</Link>
              <Link to="/services">Our services</Link>
              <Link to="/about">Why BSDS</Link>
            </div>
            <div>
              <span className="footer-label">OUR EXPERTISE</span>
              <Link to="/services/housing">Residential security</Link>
              <Link to="/services/factory">Industrial security</Link>
              <Link to="/services/commercial">Commercial & events</Link>
            </div>
            <div className="footer-cta">
              <span className="footer-label">LET'S TALK PROTECTION</span>
              <p>
                Your people deserve
                <br />
                peace of mind.
              </p>
              <a href="/hireguard">
                Hire your guard <Icon name="diagonal" size={18} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} BSDS Security. All rights reserved.
            </span>
            <span>People first. Protection always.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
