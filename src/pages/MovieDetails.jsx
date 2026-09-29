import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMovieDetails,
  getSimilarMovies,
  getRecommendedMovies,
} from "../api/tmdb";
import {
  getBackdropUrl,
  getPosterUrl,
  formatDate,
  formatRuntime,
  formatRating,
  getUsCertification,
} from "../utils/imageUtils";
import { useMyList } from "../hooks/useMyList";
import MovieRow from "../components/MovieRow";
import { DetailsSkeleton } from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import TrailerModal from "../components/TrailerModal";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInList, toggle } = useMyList();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posterError, setPosterError] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const [related, setRelated] = useState(null);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [relatedError, setRelatedError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    setPosterError(false);

    getMovieDetails(id)
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const loadRelated = () => {
    setRelatedLoading(true);
    setRelatedError(null);

    Promise.all([getSimilarMovies(id), getRecommendedMovies(id)])
      .then(([similar, recommended]) => {
        const combined = [...(recommended.results || []), ...(similar.results || [])];
        const unique = Array.from(new Map(combined.map((m) => [m.id, m])).values());
        setRelated(unique.slice(0, 18));
        setRelatedLoading(false);
      })
      .catch((err) => {
        setRelatedError(err.message);
        setRelatedLoading(false);
      });
  };

  useEffect(() => {
    load();
    loadRelated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <DetailsSkeleton />;

  if (error) {
    return (
      <div className="movie-details movie-details--error">
        <ErrorMessage message={error} onRetry={load} />
      </div>
    );
  }

  if (!movie) return null;

  const backdrop = getBackdropUrl(movie.backdrop_path, "original");
  const poster = !posterError && getPosterUrl(movie.poster_path, "large");
  const certification = getUsCertification(movie.release_dates);
  const runtime = formatRuntime(movie.runtime);
  const inList = isInList(movie.id);

  return (
    <div className="movie-details fade-in">
      <div className="movie-details__hero">
        {backdrop && (
          <img className="movie-details__backdrop" src={backdrop} alt="" />
        )}
        <div className="movie-details__hero-gradient" />
      </div>

      <div className="movie-details__body container">
        <div className="movie-details__poster-wrap">
          {poster ? (
            <img
              className="movie-details__poster"
              src={poster}
              alt={movie.title}
              onError={() => setPosterError(true)}
            />
          ) : (
            <div className="movie-details__poster movie-details__poster--fallback">
              <span>{movie.title}</span>
            </div>
          )}
        </div>

        <div className="movie-details__info">
          <h1 className="movie-details__title">{movie.title}</h1>
          {movie.original_title && movie.original_title !== movie.title && (
            <p className="movie-details__original-title">
              Original title: {movie.original_title}
            </p>
          )}

          <div className="movie-details__meta">
            <span className="movie-details__rating">
              ★ {formatRating(movie.vote_average)}
            </span>
            <span>{movie.vote_count?.toLocaleString()} votes</span>
            <span>{formatDate(movie.release_date)}</span>
            {runtime && <span>{runtime}</span>}
            {certification && (
              <span className="movie-details__cert">{certification}</span>
            )}
          </div>

          {movie.genres?.length > 0 && (
            <div className="movie-details__genres">
              {movie.genres.map((g) => (
                <span key={g.id} className="movie-details__genre-tag">
                  {g.name}
                </span>
              ))}
            </div>
          )}

          <p className="movie-details__overview">
            {movie.overview || "No overview available for this title."}
          </p>

          <div className="movie-details__stats">
            <div>
              <span className="movie-details__stat-label">Popularity</span>
              <span className="movie-details__stat-value">
                {Math.round(movie.popularity || 0).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="movie-details__stat-label">Status</span>
              <span className="movie-details__stat-value">
                {movie.status || "—"}
              </span>
            </div>
          </div>

          <div className="movie-details__buttons">
            <button
              className="movie-details__btn movie-details__btn--play"
              onClick={() => setShowTrailer(true)}
            >
              ▶ Play
            </button>
            <button
              className={`movie-details__btn movie-details__btn--list ${inList ? "movie-details__btn--list-active" : ""}`}
              onClick={() => toggle(movie)}
            >
              {inList ? "✓ In My List" : "+ My List"}
            </button>
            <button
              className="movie-details__btn movie-details__btn--back"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      <div className="movie-details__related">
        <MovieRow
          title="More Like This"
          movies={related}
          loading={relatedLoading}
          error={relatedError}
          onRetry={loadRelated}
        />
      </div>

      {showTrailer && (
        <TrailerModal
          movieId={movie.id}
          videos={movie.videos}
          title={movie.title}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
}
