import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getBackdropUrl, getYear, formatRating, formatRuntime } from "../utils/imageUtils";
import { useMyList } from "../hooks/useMyList";
import { HeroSkeleton } from "./LoadingSkeleton";
import ErrorMessage from "./ErrorMessage";
import TrailerModal from "./TrailerModal";
import "./Hero.css";

export default function Hero({ movie, loading, error, onRetry, genreMap }) {
  const navigate = useNavigate();
  const { isInList, toggle } = useMyList();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  if (loading || !movie) return <HeroSkeleton />;
  if (error) {
    return (
      <div className="hero hero--error">
        <ErrorMessage message={error} onRetry={onRetry} />
      </div>
    );
  }

  const backdrop = getBackdropUrl(movie.backdrop_path, "original");
  const genres = movie.genres
    ? movie.genres.map((g) => g.name).slice(0, 3)
    : movie.genre_ids
        ?.map((id) => genreMap?.[id])
        .filter(Boolean)
        .slice(0, 3) || [];
  const runtime = formatRuntime(movie.runtime);
  const inList = isInList(movie.id);

  return (
    <section className="hero">
      {backdrop && (
        <img
          className={`hero__backdrop ${imgLoaded ? "hero__backdrop--loaded" : ""}`}
          src={backdrop}
          alt=""
          onLoad={() => setImgLoaded(true)}
        />
      )}
      <div className="hero__gradient-bottom" />
      <div className="hero__gradient-left" />

      <div className="hero__content fade-in">
        <h1 className="hero__title">{movie.title}</h1>

        <div className="hero__meta">
          <span className="hero__rating">★ {formatRating(movie.vote_average)}</span>
          <span>{getYear(movie.release_date)}</span>
          {runtime && <span>{runtime}</span>}
          {movie.certification && (
            <span className="hero__cert">{movie.certification}</span>
          )}
          {genres.map((g) => (
            <span key={g} className="hero__genre">
              {g}
            </span>
          ))}
        </div>

        <p className="hero__overview">{movie.overview}</p>

        <div className="hero__buttons">
          <button
            className="hero__btn hero__btn--play"
            onClick={() => setShowTrailer(true)}
          >
            ▶ Play
          </button>
          <button
            className={`hero__btn hero__btn--list ${inList ? "hero__btn--list-active" : ""}`}
            onClick={() => toggle(movie)}
          >
            {inList ? "✓ In My List" : "+ My List"}
          </button>
          <button
            className="hero__btn hero__btn--info"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            ⓘ More Info
          </button>
        </div>
      </div>

      {showTrailer && (
        <TrailerModal
          movieId={movie.id}
          videos={movie.videos}
          title={movie.title}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </section>
  );
}
