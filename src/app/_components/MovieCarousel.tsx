import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { MovieType } from "../util/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { WatchTrailer } from "./WatchTrailer";
import { TOKEN } from "../util/constant";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function MovieCarousel() {
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
  // const plugin = React.useRef(
  //   Autoplay({ delay: 2000, stopOnInteraction: true })
  // );
  console.log(data);
  return (
    <Carousel>
      <CarouselContent>
        {data.results.slice(0, 10).map((movie: MovieType) => {
          return (
            <CarouselItem
              className=" w-[100%] h-[100%] relative"
              key={movie.id}
            >
              <Image
                width={1000}
                height={1000}
                className="w-[100%] h-[600px]"
                src={
                  `https://image.tmdb.org/t/p/` +
                  "original" +
                  `${movie?.backdrop_path}`
                }
                alt=""
              />
              <div className="absolute top-5 left-5 text-white p-5 gap-5">
                <p className="text-base">Now Playing:</p>
                <p className="font-bold text-4xl">{movie.title}</p>
                <p className="text-lg mb-5">⭐️{movie.vote_average}</p>
                <p className="w-[300px] text-xs mb-5">{movie.overview}</p>
                <Button variant={"secondary"}>
                  <WatchTrailer movieId={movie.id} />
                </Button>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 translate-y-1/2 left-11" />
      <CarouselNext className="absolute top-1/2 translate-y-1/2 right-11" />
    </Carousel>
  );
}
