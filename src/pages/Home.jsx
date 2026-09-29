import { useEffect, useMemo, useState } from "react";
import {
  getTrendingMovies,
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieDetails,
} from "../api/tmdb";
import { useMovies } from "../hooks/useMovies";
import { useGenreMap } from "../hooks/useGenreMap";
import { getUsCertification } from "../utils/imageUtils";
import { GENRE_SECTIONS } from "../utils/genres";
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import GenreRow from "../components/GenreRow";
import "./Home.css";

export default function Home() {
  const genreMap = useGenreMap();

  const trending = useMovies(getTrendingMovies, []);
  const popular = useMovies(getPopularMovies, []);
  const nowPlaying = useMovies(getNowPlayingMovies, []);
  const topRated = useMovies(getTopRatedMovies, []);
  const upcoming = useMovies(getUpcomingMovies, []);

  const [featured, setFeatured] = useState(null);
  const [heroLoading, setHeroLoading] = useState(true);
  const [heroError, setHeroError] = useState(null);

  const heroCandidate = useMemo(() => {
    const list = trending.data?.results;
    return list && list.length > 0 ? list[Math.floor(Math.random() * Math.min(5, list.length))] : null;
  }, [trending.data]);

  useEffect(() => {
    if (!heroCandidate) return;
    let cancelled = false;
    setHeroLoading(true);
    setHeroError(null);

    getMovieDetails(heroCandidate.id)
      .then((details) => {
        if (cancelled) return;
        setFeatured({
          ...details,
          certification: getUsCertification(details.release_dates),
        });
        setHeroLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setFeatured(heroCandidate);
        setHeroError(null);
        setHeroLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [heroCandidate]);

  return (
    <div className="home">
      <Hero
        movie={featured}
        loading={trending.loading || heroLoading}
        error={trending.error || heroError}
        onRetry={trending.retry}
        genreMap={genreMap}
      />

      <div className="home__rows">
        <MovieRow
          title="Trending Now"
          movies={trending.data?.results}
          loading={trending.loading}
          error={trending.error}
          onRetry={trending.retry}
        />
        <MovieRow
          title="Popular Movies"
          movies={popular.data?.results}
          loading={popular.loading}
          error={popular.error}
          onRetry={popular.retry}
        />
        <MovieRow
          title="Now Playing"
          movies={nowPlaying.data?.results}
          loading={nowPlaying.loading}
          error={nowPlaying.error}
          onRetry={nowPlaying.retry}
        />
        <MovieRow
          title="Top Rated"
          movies={topRated.data?.results}
          loading={topRated.loading}
          error={topRated.error}
          onRetry={topRated.retry}
        />
        <MovieRow
          title="Upcoming Movies"
          movies={upcoming.data?.results}
          loading={upcoming.loading}
          error={upcoming.error}
          onRetry={upcoming.retry}
        />

        {GENRE_SECTIONS.map((section) => (
          <GenreRow key={section.id} id={section.id} title={section.title} />
        ))}
      </div>
    </div>
  );
}
