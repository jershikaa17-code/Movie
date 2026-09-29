import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getMovieVideos } from "../api/tmdb";
import { pickTrailer } from "../utils/imageUtils";
import "./TrailerModal.css";

export default function TrailerModal({ movieId, videos, title, onClose }) {
  const [trailer, setTrailer] = useState(videos ? pickTrailer(videos) : null);
  const [loading, setLoading] = useState(!videos);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (videos) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    getMovieVideos(movieId)
      .then((data) => {
        if (cancelled) return;
        setTrailer(pickTrailer(data));
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
  }, [movieId, videos]);

  return createPortal(
    <div className="trailer-modal" onClick={onClose}>
      <div className="trailer-modal__box" onClick={(e) => e.stopPropagation()}>
        <button className="trailer-modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {loading && (
          <div className="trailer-modal__state">
            <div className="trailer-modal__spinner" />
          </div>
        )}

        {!loading && (error || !trailer) && (
          <div className="trailer-modal__state">
            <p className="trailer-modal__unavailable">
              Trailer unavailable{title ? ` for “${title}”` : ""}.
            </p>
          </div>
        )}

        {!loading && trailer && (
          <div className="trailer-modal__player">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
              title={trailer.name || "Trailer"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
