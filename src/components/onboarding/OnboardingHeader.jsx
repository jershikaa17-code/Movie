import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageMenu from "./LanguageMenu";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import "./OnboardingHeader.css";

export default function OnboardingHeader({ variant = "dark", showLanguage = false }) {
  const navigate = useNavigate();
  const { canInstall, isInstalled, isIOS, promptInstall } = useInstallPrompt();
  const [iosHintOpen, setIosHintOpen] = useState(false);

  return (
    <header className={`onboarding-header onboarding-header--${variant}`}>
      <span className="onboarding-header__logo" onClick={() => navigate("/")}>
        VEL<span>ORA</span>
      </span>

      <div className="onboarding-header__right">
        {!isInstalled && (canInstall || isIOS) && (
          <div className="onboarding-header__install">
            <button
              type="button"
              className="onboarding-header__icon-btn"
              title="Install Velora"
              aria-label="Install Velora"
              onClick={() => (canInstall ? promptInstall() : setIosHintOpen((o) => !o))}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
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
              <div className="onboarding-header__hint">
                <p>
                  Tap <strong>Share</strong> in Safari, then <strong>Add to Home Screen</strong>{" "}
                  to install Velora.
                </p>
              </div>
            )}
          </div>
        )}
        {showLanguage && <LanguageMenu />}
        {variant === "dark" ? (
          <button
            className="onboarding-header__signout"
            type="button"
            onClick={() => navigate("/")}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="onboarding-header__signout-link"
            type="button"
            onClick={() => navigate("/")}
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
}
