import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getPosterUrl } from "../../utils/imageUtils";
import { RowSkeleton } from "../LoadingSkeleton";
import ErrorMessage from "../ErrorMessage";
import "./RankedRow.css";

export default function RankedRow({ title, movies, loading, error, onRetry }) {
  const trackRef = useRef(null);
  const [showRight, setShowRight] = useState(true);
  const navigate = useNavigate();

  const updateArrow = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  const scrollNext = () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.85, behavior: "smooth" });
    setTimeout(updateArrow, 400);
  };

  if (loading) {
    return (
      <section className="ranked-row">
        <h2 className="ranked-row__title">{title}</h2>
        <RowSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <section className="ranked-row">
        <h2 className="ranked-row__title">{title}</h2>
        <ErrorMessage message={error} onRetry={onRetry} />
      </section>
    );
  }

  if (!movies || movies.length === 0) return null;

  return (
    <section className="ranked-row">
      <h2 className="ranked-row__title">{title}</h2>
      <div className="ranked-row__viewport">
        <div className="ranked-row__track" ref={trackRef} onScroll={updateArrow}>
          {movies.slice(0, 10).map((movie, i) => {
            const poster = getPosterUrl(movie.poster_path, "medium");
            return (
              <div
                className="ranked-row__item"
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <span className="ranked-row__number">{i + 1}</span>
                {poster ? (
                  <img className="ranked-row__poster" src={poster} alt={movie.title} loading="lazy" />
                ) : (
                  <div className="ranked-row__poster ranked-row__poster--fallback">
                    <span>{movie.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {showRight && (
          <button className="ranked-row__arrow" onClick={scrollNext} aria-label="Scroll right">
            ›
          </button>
        )}
      </div>
    </section>
  );
}
