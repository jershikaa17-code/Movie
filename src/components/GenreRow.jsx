import { useCallback } from "react";
import { getMoviesByGenre } from "../api/tmdb";
import { useMovies } from "../hooks/useMovies";
import MovieRow from "./MovieRow";

export default function GenreRow({ id, title }) {
  const fetcher = useCallback(() => getMoviesByGenre(id), [id]);
  const { data, loading, error, retry } = useMovies(fetcher, [id]);

  return (
    <MovieRow
      title={title}
      movies={data?.results}
      loading={loading}
      error={error}
      onRetry={retry}
    />
  );
}
