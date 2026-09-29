import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import { useDebounce } from "../hooks/useDebounce";
import MovieCard from "../components/MovieCard";
import { GridSkeleton } from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import "./Search.css";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const initialQuery = params.get("q") || "";

  const [input, setInput] = useState(initialQuery);
  const debouncedInput = useDebounce(input, 400);

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(!!initialQuery);
  const [error, setError] = useState(null);

  useEffect(() => {
    setInput(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const trimmed = debouncedInput.trim();

    if (trimmed !== (params.get("q") || "")) {
      if (trimmed) setParams({ q: trimmed }, { replace: true });
      else setParams({}, { replace: true });
    }

    if (!trimmed) {
      setResults(null);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    searchMovies(trimmed)
      .then((data) => {
        if (cancelled) return;
        setResults(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  const retry = () => {
    const trimmed = debouncedInput.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    searchMovies(trimmed)
      .then((data) => {
        setResults(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="search-page container">
      <div className="search-page__bar">
        <input
          className="search-page__input"
          type="text"
          autoFocus
          placeholder="Search movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {input.trim() && (
        <h2 className="search-page__heading">
          Search results for &ldquo;{input.trim()}&rdquo;
        </h2>
      )}

      {loading && <GridSkeleton count={12} />}

      {!loading && error && <ErrorMessage message={error} onRetry={retry} />}

      {!loading && !error && results && results.length === 0 && (
        <ErrorMessage
          title="No movies found"
          message="Sorry, we couldn't find any movies matching your search."
        />
      )}

      {!loading && !error && results && results.length > 0 && (
        <div className="search-page__grid">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {!loading && !input.trim() && (
        <div className="search-page__prompt">
          Start typing to search thousands of movies.
        </div>
      )}
    </div>
  );
}
