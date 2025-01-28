import { TOKEN } from "@/app/util/constant";
import { createdType } from "@/app/util/createdType";
import { genreType } from "@/app/util/genreType";
import { MovieType } from "@/app/util/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function page1({
  params: { movieId },
}: {
  params: { movieId: string };
}) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const responseStar = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  // function formatVoteAverage(vote: number) {
  //   const hours = Math.floor(vote / 60);
  //   const minutes = vote % 60;
  //   return `${hours}h ${minutes}min`;
  // }

  // function formatVoteAverage2(vote: number) {
  //   return (Math.floor(vote * 10) / 10).toString().replace(".", ".");
  // }
  const data = await response.json();
  console.log(data);
  const dataStar = await responseStar.json();
  // console.log(dataStar);
  return (
    <div className="max-w-[1280px] m-auto">
      <div>
        {/* {data.map((movie: MovieType, index: number) => {
          return <div>{movie.poster_path}</div>;
        })} */}
        <h1 className="text-[24px], font-semibold">{data.original_title}</h1>
        <h2 className="text-[14px]">{data.release_date}</h2>
        {/* <p>{data.adult ? "R" : "PG"}</p>
        <p>Rating</p>
        <p>{formatVoteAverage(data.runtime)}</p>

        <p>{formatVoteAverage2(data.vote_average)}</p> */}
        <Image
          width={1000}
          height={1000}
          src={"https://image.tmdb.org/t/p/w500" + data.poster_path}
          alt=""
          className="w-[290px] h-[428px]"
        />
        <div className="flex flex-col  gap-[5px]">
          <div className="flex">
            <p>
              {data.genres.map((genre: genreType, id: number) => {
                return <div>{genre.name}</div>;
              })}
            </p>
          </div>
          <p className="text-[16px]">{data.overview}</p>
          <h2 className="border-b-[1px] text-[16px] font-bold">Director:</h2>
          <h2 className="border-b-[1px] text-[16px] font-bold">Writers:</h2>
          <h2 className=" flex border-b-[1px] text-[16px] font-bold">
            Stars:
            {dataStar.cast
              .slice(0, 5)
              .map((movie: createdType, index: number) => {
                return <div>{movie.original_name}</div>;
              })}
          </h2>
        </div>
      </div>
    </div>
  );
}
