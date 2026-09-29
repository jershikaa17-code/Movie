import { POSTER_SIZES, BACKDROP_SIZES } from "../api/tmdb";

export function getPosterUrl(path, size = "medium") {
  if (!path) return null;
  return `${POSTER_SIZES[size]}${path}`;
}

export function getBackdropUrl(path, size = "large") {
  if (!path) return null;
  return `${BACKDROP_SIZES[size]}${path}`;
}

export function getYear(dateString) {
  if (!dateString) return "—";
  return dateString.slice(0, 4);
}

export function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRuntime(minutes) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export function formatRating(voteAverage) {
  if (voteAverage === undefined || voteAverage === null || voteAverage === 0) {
    return "N/A";
  }
  return voteAverage.toFixed(1);
}

export function pickTrailer(videos) {
  const results = videos?.results || videos;
  if (!results || results.length === 0) return null;

  const youtube = results.filter((v) => v.site === "YouTube");
  if (youtube.length === 0) return null;

  const rank = (v) => {
    if (v.type === "Trailer" && v.official) return 0;
    if (v.type === "Trailer") return 1;
    if (v.type === "Teaser" && v.official) return 2;
    if (v.type === "Teaser") return 3;
    return 4;
  };

  return [...youtube].sort((a, b) => rank(a) - rank(b))[0];
}

export function getUsCertification(releaseDates) {
  const results = releaseDates?.results;
  if (!results) return null;
  const us = results.find((r) => r.iso_3166_1 === "US");
  const cert = us?.release_dates?.find((rd) => rd.certification)?.certification;
  return cert || null;
}
