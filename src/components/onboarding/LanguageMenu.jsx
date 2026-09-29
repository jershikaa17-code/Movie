import { useEffect, useRef, useState } from "react";
import "./LanguageMenu.css";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "zh", label: "中文" },
];

export default function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="language-menu" ref={ref}>
      <button
        type="button"
        className="language-menu__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="language-menu__icon" aria-hidden="true">
          文<span>A</span>
        </span>
        {selected.label}
        <span className={`language-menu__caret ${open ? "language-menu__caret--open" : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <ul className="language-menu__dropdown" role="listbox">
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === selected.code}>
              <button
                type="button"
                className={`language-menu__item ${lang.code === selected.code ? "language-menu__item--active" : ""}`}
                onClick={() => {
                  setSelected(lang);
                  setOpen(false);
                }}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
