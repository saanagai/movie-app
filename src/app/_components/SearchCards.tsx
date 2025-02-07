import { MovieType } from "../util/types";
import { MovieCard } from "./MovieCard";

export const SearchCards = ({ movies }: { movies: MovieType[] }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
};
