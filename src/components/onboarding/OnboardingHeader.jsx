import { useNavigate } from "react-router-dom";
import LanguageMenu from "./LanguageMenu";
import "./OnboardingHeader.css";

export default function OnboardingHeader({ variant = "dark", showLanguage = false }) {
  const navigate = useNavigate();

  return (
    <header className={`onboarding-header onboarding-header--${variant}`}>
      <span className="onboarding-header__logo" onClick={() => navigate("/")}>
        VEL<span>ORA</span>
      </span>

      <div className="onboarding-header__right">
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
