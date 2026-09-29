import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosterUrl, getYear, formatRating } from "../utils/imageUtils";
import { useMyList } from "../hooks/useMyList";
import TrailerModal from "./TrailerModal";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { isInList, toggle } = useMyList();
  const [imgError, setImgError] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const poster = !imgError && getPosterUrl(movie.poster_path, "medium");
  const inList = isInList(movie.id);

  const goToDetails = () => navigate(`/movie/${movie.id}`);

  return (
    <div className="movie-card" onClick={goToDetails}>
      <div className="movie-card__poster-wrap">
        {poster ? (
          <img
            className="movie-card__poster"
            src={poster}
            alt={movie.title}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="movie-card__poster movie-card__poster--fallback">
            <span>{movie.title}</span>
          </div>
        )}

        <div className="movie-card__overlay">
          <div className="movie-card__overlay-top">
            <span className="movie-card__rating">
              ★ {formatRating(movie.vote_average)}
            </span>
            <span className="movie-card__year">{getYear(movie.release_date)}</span>
          </div>
          <h4 className="movie-card__title">{movie.title}</h4>
          <p className="movie-card__overview">{movie.overview}</p>
          <div className="movie-card__actions">
            <button
              className="movie-card__icon-btn movie-card__icon-btn--play"
              onClick={(e) => {
                e.stopPropagation();
                setShowTrailer(true);
              }}
              aria-label="Play"
              title="Play"
            >
              ▶
            </button>
            <button
              className={`movie-card__icon-btn ${inList ? "movie-card__icon-btn--active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggle(movie);
              }}
              aria-label="Add to My List"
              title="Add to My List"
            >
              {inList ? "✓" : "+"}
            </button>
            <button
              className="movie-card__icon-btn movie-card__icon-btn--info"
              onClick={(e) => {
                e.stopPropagation();
                goToDetails();
              }}
              aria-label="More Info"
              title="More Info"
            >
              ⓘ
            </button>
          </div>
        </div>
      </div>

      <div className="movie-card__basic">
        <h5 className="movie-card__basic-title">{movie.title}</h5>
        <div className="movie-card__basic-meta">
          <span>★ {formatRating(movie.vote_average)}</span>
          <span>{getYear(movie.release_date)}</span>
        </div>
      </div>

      {showTrailer && (
        <TrailerModal
          movieId={movie.id}
          title={movie.title}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
}
