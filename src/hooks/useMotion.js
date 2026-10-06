import { useEffect } from "react";
export default function useMotion(ref, route) {
  useEffect(() => {
    const root = ref.current;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    let frame = null;
    const layers = [...root.querySelectorAll("[data-parallax]")];
    function update() {
      frame = null;
      layers.forEach((el) => {
        if (preference.matches) {
          el.style.transform = "";
          return;
        }
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight) return;
        const y = Math.max(-38, Math.min(38, -rect.top * 0.1));
        el.style.transform = `translate3d(0,${y}px,0) scale(1.1)`;
      });
    }
    function schedule() {
      if (frame === null) frame = requestAnimationFrame(update);
    }
    function setup() {
      observer?.disconnect();
      root.classList.remove("motion");
      if (!preference.matches && "IntersectionObserver" in window) {
        root.classList.add("motion");
        observer = new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
              }
            }),
          { threshold: 0.08 },
        );
        root.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
      }
      schedule();
    }
    setup();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      preference.removeEventListener("change", setup);
      root.classList.remove("motion");
      layers.forEach((el) => {
        el.style.transform = "";
      });
    };
  }, [ref, route]);
}
