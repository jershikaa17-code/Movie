import { useRef, useState, useCallback } from "react";
import MovieCard from "./MovieCard";
import { RowSkeleton } from "./LoadingSkeleton";
import ErrorMessage from "./ErrorMessage";
import "./MovieRow.css";

export default function MovieRow({ title, movies, loading, error, onRetry }) {
  const trackRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 8);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(updateArrows, 400);
  };

  if (loading) {
    return (
      <section className="movie-row">
        <h2 className="movie-row__title">{title}</h2>
        <RowSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <section className="movie-row">
        <h2 className="movie-row__title">{title}</h2>
        <ErrorMessage message={error} onRetry={onRetry} />
      </section>
    );
  }

  if (!movies || movies.length === 0) return null;

  return (
    <section className="movie-row">
      <h2 className="movie-row__title">{title}</h2>
      <div className="movie-row__viewport">
        {showLeft && (
          <button
            className="movie-row__arrow movie-row__arrow--left"
            onClick={() => scrollBy(-1)}
            aria-label={`Scroll ${title} left`}
          >
            ‹
          </button>
        )}
        <div
          className="movie-row__track"
          ref={trackRef}
          onScroll={updateArrows}
        >
          {movies.map((movie) => (
            <div className="movie-row__item" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        {showRight && (
          <button
            className="movie-row__arrow movie-row__arrow--right"
            onClick={() => scrollBy(1)}
            aria-label={`Scroll ${title} right`}
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}
