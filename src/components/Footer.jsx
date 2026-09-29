import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            VEL<span>ORA</span>
          </span>
          <p className="footer__tagline">Questions? Contact support.</p>
        </div>

        <nav className="footer__links">
          <Link to="/browse">Home</Link>
          <Link to="/popular">Popular</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/upcoming">Upcoming</Link>
          <Link to="/about">About</Link>
        </nav>

        <div className="footer__attribution">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="The Movie Database logo"
            className="footer__tmdb-logo"
          />
          <p>
            This product uses the TMDB API but is not endorsed or certified
            by TMDB.
          </p>
        </div>

        <p className="footer__copy">
          Built for demonstration purposes. All movie data courtesy of TMDB.
        </p>
      </div>
    </footer>
  );
}
