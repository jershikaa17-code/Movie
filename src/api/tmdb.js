import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const POSTER_SIZES = {
  small: `${IMAGE_BASE}/w185`,
  medium: `${IMAGE_BASE}/w342`,
  large: `${IMAGE_BASE}/w500`,
};

export const BACKDROP_SIZES = {
  medium: `${IMAGE_BASE}/w780`,
  large: `${IMAGE_BASE}/w1280`,
  original: `${IMAGE_BASE}/original`,
};

const client = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

class ApiKeyError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApiKeyError";
  }
}

// Simple in-memory response cache to avoid refetching the same endpoint
// repeatedly within a session.
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;
const inflight = new Map();

function cacheKey(url, params) {
  return `${url}?${JSON.stringify(params || {})}`;
}

async function request(url, params) {
  if (!API_KEY || API_KEY === "your_tmdb_v3_api_key_here") {
    throw new ApiKeyError(
      "TMDB API key is missing. Add VITE_TMDB_API_KEY to your .env file."
    );
  }

  const key = cacheKey(url, params);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.time < CACHE_TTL) {
    return cached.data;
  }

  if (inflight.has(key)) {
    return inflight.get(key);
  }

  const promise = client
    .get(url, { params })
    .then((res) => {
      cache.set(key, { data: res.data, time: Date.now() });
      inflight.delete(key);
      return res.data;
    })
    .catch((err) => {
      inflight.delete(key);
      if (err.response?.status === 401) {
        throw new ApiKeyError("Invalid TMDB API key.");
      }
      if (!err.response) {
        throw new Error("Network error. Please check your connection.");
      }
      throw new Error(
        err.response?.data?.status_message ||
          "Something went wrong while talking to TMDB."
      );
    });

  inflight.set(key, promise);
  return promise;
}

export function getPopularMovies(page = 1) {
  return request("/movie/popular", { page });
}

export function getTrendingMovies(timeWindow = "week") {
  return request(`/trending/movie/${timeWindow}`);
}

export function getNowPlayingMovies(page = 1) {
  return request("/movie/now_playing", { page });
}

export function getTopRatedMovies(page = 1) {
  return request("/movie/top_rated", { page });
}

export function getUpcomingMovies(page = 1) {
  return request("/movie/upcoming", { page });
}

export function searchMovies(query, page = 1) {
  return request("/search/movie", { query, page, include_adult: false });
}

export function getMovieDetails(id) {
  return request(`/movie/${id}`, {
    append_to_response: "credits,videos,release_dates",
  });
}

export function getSimilarMovies(id, page = 1) {
  return request(`/movie/${id}/similar`, { page });
}

export function getRecommendedMovies(id, page = 1) {
  return request(`/movie/${id}/recommendations`, { page });
}

export function getMovieVideos(id) {
  return request(`/movie/${id}/videos`);
}

export function getMoviesByGenre(genreId, page = 1) {
  return request("/discover/movie", {
    with_genres: genreId,
    page,
    sort_by: "popularity.desc",
  });
}

export function getGenreList() {
  return request("/genre/movie/list");
}

export { ApiKeyError };
