import { MovieType } from "./util/types";
import { TOKEN } from "./util/constant";

export default async function Home() {
  const asd = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=enUS&page=1",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await asd.json();
  console.log(data);

  return (
    <div className="grid grid-cols-5 gap-8 rounded-lg px-8">
      {data.results.map((movie: MovieType, index: number) => {
        return (
          <div className=" w-[100%] " key={index}>
            <img
              className="w-[100%]"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt=""
            />
            <div className=" p-5">
              <p>⭐️ {movie.vote_average}</p>
              <p>{movie.original_title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
