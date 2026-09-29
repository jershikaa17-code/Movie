import { useEffect, useRef, useState } from "react";
import "./FooterMark.css";

// Same path data as public/favicon.svg (viewBox 0 0 48 48) — the Velora "V"
// mark, reused here (not redrawn) so the footer visual matches the browser
// tab icon exactly.
const V_PATH = "M11 12h6.2l6.8 20 6.8-20H37L26.6 38h-5.2L11 12Z";

export default function FooterMark() {
  const outerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const el = outerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Re-plays the entrance every time the mark scrolls into view (not just
    // once) — animKey forces a remount so the CSS animations restart clean.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimKey((k) => k + 1);
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (footer just entering at the bottom) -> 1 (footer near the top)
      const progress = 1 - rect.top / vh;
      const offset = Math.max(-16, Math.min(16, progress * 16));
      setParallax(offset);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="footer-mark"
      ref={outerRef}
      style={{ transform: `translate3d(0, ${parallax}px, 0)` }}
      aria-hidden="true"
    >
      <div
        key={animKey}
        className={`footer-mark__inner ${visible ? "footer-mark__inner--visible" : ""}`}
      >
        <svg viewBox="0 0 48 48" className="footer-mark__svg">
          <path
            d={V_PATH}
            pathLength="1"
            className="footer-mark__stroke"
            fill="none"
            stroke="#e50914"
            strokeWidth="1.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path d={V_PATH} className="footer-mark__fill" fill="#e50914" />
        </svg>
      </div>
    </div>
  );
}
