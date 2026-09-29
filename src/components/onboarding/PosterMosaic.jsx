import { getPosterUrl } from "../../utils/imageUtils";
import "./PosterMosaic.css";

export default function PosterMosaic({ movies }) {
  if (!movies || movies.length === 0) return null;

  const tiles = [...movies, ...movies].slice(0, 16);

  return (
    <div className="poster-mosaic">
      <div className="poster-mosaic__grid">
        {tiles.map((movie, i) => {
          const poster = getPosterUrl(movie.poster_path, "medium");
          if (!poster) return <div className="poster-mosaic__tile poster-mosaic__tile--empty" key={`${movie.id}-${i}`} />;
          return (
            <div className="poster-mosaic__tile" key={`${movie.id}-${i}`}>
              <img src={poster} alt="" loading="lazy" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
