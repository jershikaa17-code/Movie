import { useCallback, useEffect, useState } from "react";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import { GridSkeleton } from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import "./Browse.css";

const FETCHERS = {
  popular: getPopularMovies,
  "now-playing": getNowPlayingMovies,
  "top-rated": getTopRatedMovies,
  upcoming: getUpcomingMovies,
};

export default function Browse({ category, title }) {
  const fetcher = FETCHERS[category];

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback((pageNum, append) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    setError(null);

    fetcher(pageNum)
      .then((data) => {
        setMovies((prev) => (append ? [...prev, ...data.results] : data.results));
        setTotalPages(data.total_pages || 1);
        setPage(pageNum);
        setLoading(false);
        setLoadingMore(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setLoadingMore(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    setMovies([]);
    load(1, false);
  }, [load]);

  if (loading) {
    return (
      <div className="browse container">
        <h1 className="browse__title">{title}</h1>
        <GridSkeleton count={18} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="browse container">
        <h1 className="browse__title">{title}</h1>
        <ErrorMessage message={error} onRetry={() => load(1, false)} />
      </div>
    );
  }

  return (
    <div className="browse container">
      <h1 className="browse__title">{title}</h1>

      {movies.length === 0 ? (
        <ErrorMessage
          title="No movies found"
          message="There is nothing to show here right now."
        />
      ) : (
        <>
          <div className="browse__grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {page < totalPages && (
            <div className="browse__load-more">
              <button
                className="browse__load-more-btn"
                onClick={() => load(page + 1, true)}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
