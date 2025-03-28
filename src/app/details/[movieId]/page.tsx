import { TOKEN } from "@/app/util/constant";
import { createdType } from "@/app/util/createdType";
import { genreType } from "@/app/util/genreType";
import { Trailer } from "@/app/util/trailerType";
import { MovieType } from "@/app/util/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  // const responseVideos = await fetch(
  //   `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${TOKEN}`,
  //       "Content-type": "application/json",
  //     },
  //   }
  // );
  const similarData = await fetch(
    ` https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-type": "application/json",
      },
    }
  );
  const trailerData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  // console.log(data);
  const dataStar = await responseStar.json();
  // console.log(dataStar);
  // const dataVideos = await responseVideos.json();
  // console.log(dataVideos);
  const dataSimilar = await similarData.json();
  // console.log(similarData);

  // const similarData = await similarResponse.json();
  // console.log(trailer);
  // const trailerWeNeed = trailer.results.find((video: Trailer) => {
  //   return video.type === "Trailer";
  // });
  // console.log(trailerWeNeed);
  const trailer = await trailerData.json();
  // console.log(trailer);

  const trailerUse = trailer.results.find((video: Trailer) => {
    return video.type === "Trailer";
  });
  // console.log(trailerData);
  // const durationHour = data.runtime / 60;
  // const durition = data.runtime % 60;
  // const voteCount = data.vote_count / 1000;

  return (
    <div className="max-w-[1280px] m-auto">
      <div>
        <div>
          <h1 className="text-[36px] font-bold">{data.original_title}</h1>
          <h2 className="text-[14px]">{data.release_date}</h2>
        </div>
        <div className=" p-5">{/* <p>⭐️ {movie?.vote_average}</p> */}</div>
        <div className="flex gap-2 mb-5">
          <Image
            width={1000}
            height={1000}
            src={"https://image.tmdb.org/t/p/w500" + data.poster_path}
            alt=""
            className="w-[290px] h-[428px] rounded-sm"
          />
          <Dialog>
            <div className="relative">
              <Image
                className="w-full relative h-[430px] cursor-pointer rounded-lg bg-black "
                width={1000}
                height={1000}
                src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
                alt={data.original_title}
                priority
              />
              <DialogTrigger asChild>
                <Button variant={"ghost"} className="absolute left-4 bottom-8">
                  <PlayIcon />
                  Play trailer
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent>
              <iframe
                width={460}
                height={300}
                src={`https://www.youtube.com/embed/${trailerUse?.key}`}
              ></iframe>
              <DialogTitle>{""}</DialogTitle>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col  gap-2">
          <div className="flex gap-3  ">
            {data.genres.map((genre: genreType, id: number) => {
              return (
                <div
                  key={id}
                  className="border-[1px] rounded-lg border-spacing-1 text-[12px]  font-bold p-1"
                >
                  {genre.name}
                </div>
              );
            })}
          </div>
          <p className="text-[16px]">{data.overview}</p>
          <h2 className="border-b-[1px] text-[16px] font-bold">Director:</h2>
          <div className=" flex border-b-[1px] text-[16px] font-bold">
            {dataStar.cast.slice(0, 1).map((movie: createdType, id: number) => {
              return <div key={id}>{movie.original_name}</div>;
            })}
          </div>
          <div>
            <h2 className="border-b-[1px] text-[16px] flex gap-16">
              <p className="text-[16px] w-[64px] font-bold"> Writers</p>
              {dataStar.crew
                .slice(0, 1)
                .map((movie: createdType, id: number) => {
                  return <div key={id}>{movie.original_name}</div>;
                })}
            </h2>
          </div>
          <div>
            <h2 className="border-b-[1px] text-[16px]  flex gap-16">
              <p className="w-[64px] font-bold">Stars</p>
              {dataStar.cast
                .slice(0, 5)
                .map((movie: createdType, id: number) => {
                  return <div key={id}>·{movie.original_name}</div>;
                })}
            </h2>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <h3 className="text-foreground text-2xl font-semibold">
            More like this
          </h3>
          <Link href={`/seeMore/${movieId}/similar`}>
            <button className="inline-flex ">
              See more
              <ArrowRight />
            </button>
          </Link>
        </div>
        <div className="flex gap-5 mt-10 mb-20 overflow-hidden w-[1080px]">
          {dataSimilar.results
            .slice(0, 5)
            .map((movie: MovieType, id: number) => {
              return (
                <Link href={`/details/${movie.id}`} key={id}>
                  <div>
                    <div>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        width={229.73}
                        height={340}
                        alt=""
                      />
                    </div>
                    <div className="p-2">
                      <div className=" flex items-center">
                        <p>⭐️ {movie.vote_average.toFixed(1)}</p>
                        <p className="text-[#71717A] text-[12px]">/10</p>
                      </div>
                      <h2 className="text-[18px]">{movie.original_title}</h2>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
