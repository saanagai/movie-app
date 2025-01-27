import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { MovieType } from "../util/types";
import { useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
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
              <WatchTrailer
                title={movie.title}
                vote_average={movie.vote_average}
                overview={movie.overview}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 translate-y-1/2 left-11" />
      <CarouselNext className="absolute top-1/2 translate-y-1/2 right-11" />
    </Carousel>
  );
}
