import { useMyList } from "../hooks/useMyList";
import MovieCard from "../components/MovieCard";
import ErrorMessage from "../components/ErrorMessage";
import "./MyList.css";

export default function MyList() {
  const { list } = useMyList();

  return (
    <div className="my-list container">
      <h1 className="my-list__title">My List</h1>

      {list.length === 0 ? (
        <ErrorMessage
          title="Your list is empty"
          message="Add movies to My List from any movie card or the details page — they'll show up here."
        />
      ) : (
        <div className="my-list__grid">
          {list.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
