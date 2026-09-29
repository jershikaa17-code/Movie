import { useNavigate } from "react-router-dom";
import { getTrendingMovies } from "../../api/tmdb";
import { useMovies } from "../../hooks/useMovies";
import OnboardingHeader from "../../components/onboarding/OnboardingHeader";
import PosterMosaic from "../../components/onboarding/PosterMosaic";
import RankedRow from "../../components/onboarding/RankedRow";
import FaqAccordion from "../../components/onboarding/FaqAccordion";
import LanguageMenu from "../../components/onboarding/LanguageMenu";
import "./FinishSignUp.css";

const REASONS = [
  {
    title: "Enjoy on your TV",
    text: "Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
  },
  {
    title: "Download your shows to watch offline",
    text: "Save your favorites easily and always have something to watch.",
  },
  {
    title: "Watch everywhere",
    text: "Stream unlimited movies on your phone, tablet, laptop, and TV.",
  },
  {
    title: "Create profiles for kids",
    text: "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
  },
];

const FOOTER_COLUMNS = [
  ["FAQ", "Investor Relations", "Privacy", "Speed Test"],
  ["Help Center", "Jobs", "Cookie Preferences", "Legal Notices"],
  ["Account", "Ways to Watch", "Corporate Information", "Only on Velora"],
  ["Media Center", "Terms of Use", "Contact Us"],
];

export default function FinishSignUp() {
  const navigate = useNavigate();
  const trending = useMovies(getTrendingMovies, []);
  const movies = trending.data?.results;

  const goNext = () => navigate("/login");

  return (
    <div className="finish-signup">
      <div className="finish-signup__hero">
        <PosterMosaic movies={movies} />
        <div className="finish-signup__hero-overlay" />
        <OnboardingHeader variant="dark" showLanguage />

        <div className="finish-signup__hero-content">
          <h1>
            Laughs. Tears. Thrills.
            <br />
            It&rsquo;s all here.
          </h1>
          <p className="finish-signup__price">Every mood has a movie.</p>
          <button className="finish-signup__cta" onClick={goNext}>
            Finish Sign-Up <span>›</span>
          </button>
          <button
            type="button"
            className="finish-signup__skip"
            onClick={() => navigate("/browse")}
          >
            Skip
          </button>
        </div>
      </div>

      <div className="finish-signup__body">
        <RankedRow
          title="Trending Now"
          movies={movies}
          loading={trending.loading}
          error={trending.error}
          onRetry={trending.retry}
        />

        <section className="finish-signup__reasons">
          <h2>More Reasons to Join</h2>
          <div className="finish-signup__reasons-grid">
            {REASONS.map((r) => (
              <div className="finish-signup__reason-card" key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="finish-signup__faq">
          <h2>Frequently Asked Questions</h2>
          <FaqAccordion />
        </section>

        <div className="finish-signup__bottom-cta">
          <button className="finish-signup__cta" onClick={goNext}>
            Finish Sign-Up <span>›</span>
          </button>
        </div>

        <p className="finish-signup__support">Questions? Contact support.</p>

        <footer className="finish-signup__footer">
          <div className="finish-signup__footer-links">
            {FOOTER_COLUMNS.map((col, i) => (
              <div className="finish-signup__footer-col" key={i}>
                {col.map((link) => (
                  <a href="#" key={link}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="finish-signup__language">
            <LanguageMenu />
          </div>

          <p className="finish-signup__brand">Velora</p>
        </footer>
      </div>
    </div>
  );
}
