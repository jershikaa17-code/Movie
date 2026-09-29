import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", to: "/browse" },
  { label: "Popular", to: "/popular" },
  { label: "Now Playing", to: "/now-playing" },
  { label: "Top Rated", to: "/top-rated" },
  { label: "Upcoming", to: "/upcoming" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [iosHintOpen, setIosHintOpen] = useState(false);
  const inputRef = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { canInstall, isInstalled, isIOS, promptInstall } = useInstallPrompt();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!menuOpen && !profileOpen && !iosHintOpen) return;
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
        setProfileOpen(false);
        setIosHintOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setProfileOpen(false);
        setIosHintOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, profileOpen, iosHintOpen]);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--solid" : ""}`} ref={navRef}>
      <div className="navbar__inner">
        <div className="navbar__left">
          <NavLink to="/browse" className="navbar__logo">
            VEL<span>ORA</span>
          </NavLink>
          <nav className="navbar__links">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="navbar__right">
          <form
            className={`navbar__search ${searchOpen ? "navbar__search--open" : ""}`}
            onSubmit={submitSearch}
          >
            <button
              type="button"
              className="navbar__icon-btn navbar__search-toggle"
              onClick={() => setSearchOpen((o) => !o)}
              aria-label="Toggle search"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <line x1="21" y1="21" x2="16.2" y2="16.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <input
              ref={inputRef}
              className="navbar__search-input"
              type="text"
              placeholder="Titles, people, genres"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => !query && setSearchOpen(false)}
            />
          </form>

          {!isInstalled && (canInstall || isIOS) && (
            <div className="navbar__install">
              <button
                className="navbar__icon-btn"
                title="Install Velora"
                aria-label="Install Velora"
                onClick={() => {
                  if (canInstall) {
                    promptInstall();
                  } else {
                    setIosHintOpen((o) => !o);
                  }
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 7.5v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path
                    d="M8.5 11.5 12 15l3.5-3.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path d="M8 17.5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {iosHintOpen && (
                <div className="navbar__dropdown navbar__dropdown--hint">
                  <p>
                    Tap <strong>Share</strong> in Safari, then{" "}
                    <strong>Add to Home Screen</strong> to install Velora.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="navbar__profile">
            <button
              className="navbar__avatar"
              onClick={() => setProfileOpen((o) => !o)}
              aria-label="Account menu"
              aria-expanded={profileOpen}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" fill="currentColor" />
                <path
                  d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <svg
                className={`navbar__avatar-caret ${profileOpen ? "navbar__avatar-caret--open" : ""}`}
                viewBox="0 0 12 8"
                width="10"
                height="7"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {profileOpen && (
              <div className="navbar__dropdown">
                <button
                  className="navbar__dropdown-item"
                  onClick={() => {
                    navigate("/my-list");
                    setProfileOpen(false);
                  }}
                >
                  My List
                </button>
                <button
                  className="navbar__dropdown-item"
                  onClick={() => {
                    navigate("/");
                    setProfileOpen(false);
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <button
            className="navbar__icon-btn navbar__hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="navbar__mobile-menu">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/my-list"
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            My List
          </NavLink>
        </nav>
      )}
    </header>
  );
}
