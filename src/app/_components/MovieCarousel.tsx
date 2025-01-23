"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { MovieType } from "../util/types";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function MovieCarousel({ movies }: { movies: MovieType[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem>
          {movies?.slice(0, 10).map(() => {
            return (
              <div className="w-[100%]">
                <Image
                  width={1000}
                  height={1000}
                  src={`https://image.tmdb.org/t/p/"+ "original" +${movies[0]?.backdrop_path}`}
                  alt=""
                />
              </div>
            );
          })}
        </CarouselItem>
        {/* {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
