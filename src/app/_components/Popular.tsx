import { TOKEN } from "../util/constant";
import { MovieType } from "../util/types";
import { MovieCard } from "./MovieCard";

export async function Popular() {
  const asd = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await asd.json();
  // console.log(data);
  return (
    <div>
      <div>
        <h3 className="text-foreground text-2xl font-semibold">Popular</h3>
        <button className="inline-flex ">See more</button>
      </div>
      <div className="grid grid-cols-5 gap-8 rounded-lg px-8 mt-10 mb-20">
        {data.results.map((movie: MovieType, index: number) => {
          return <MovieCard movie={movie} key={index} />;
        })}
      </div>
    </div>
  );
}
