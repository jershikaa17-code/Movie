import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found container">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__text">
        We couldn't find the page you're looking for.
      </p>
      <Link to="/browse" className="not-found__link">
        Back to Home
      </Link>
    </div>
  );
}
