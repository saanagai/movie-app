import { MovieType } from "../util/types";
import Image from "next/image";

export const MovieCard = ({ movie }: { movie: MovieType }) => {
  return (
    <div className="h-[450px] w-[230px] bg-slate-100 rounded-md overflow-hidden">
      <Image
        width={1000}
        height={1000}
        className="w-[100%]"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt=""
      />
      <div className=" p-5">
        <p>⭐️ {movie?.vote_average}</p>
        <p>{movie?.original_title}</p>
      </div>
    </div>
  );
};
