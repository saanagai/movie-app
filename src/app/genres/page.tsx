"use client";
import { useEffect, useState } from "react";
import { MovieType } from "@/app/util/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { genreType } from "../util/genreType";
import { TOKEN } from "../util/constant";

export default function Page() {
  const [genres, setGenres] = useState<genreType[]>();
  const [filterGenres, setFilterGenres] = useState<MovieType[]>();
  const [totalResults, setTotalResults] = useState<number>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const genresId = searchParams.get("genresId");
  // console.log("genreIds", genresId);

  async function getGenres() {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setGenres(data.genres);
  }

  async function discoverMovies() {
    const discoverMovie = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genresId}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-type": "applycation.json",
        },
      }
    );
    const data = await discoverMovie.json();
    setFilterGenres(data.results);
    setTotalResults(data.total_results);
    // console.log(data);
  }

  useEffect(() => {
    discoverMovies();
    getGenres();
  }, [genresId]);

  const onValueChange = (values: string[]) => {
    // console.log(values);
    router.push(`/genres?genresId=${values}`);
  };

  return (
    <div className="max-w-[1200px] m-auto flex gap-5 mt-[34px]">
      <div>
        <p className="text-[30px] font-bold mt-[35px] mb-[25px]">
          Search filter
        </p>
        <div className="w-[387px] h-[352px] flex flex-col gap-5 ">
          <div>
            <p className="text-[24px] font-bold">Genres</p>
            <p className="text-[16px]">See list of movies by genre</p>
          </div>
          <div className="flex flex-wrap w-[387px] h-[272px]">
            <ToggleGroup
              onValueChange={onValueChange}
              type="multiple"
              className="flex flex-wrap justify-between items-center "
            >
              {genres?.map((data: genreType, index: number) => {
                return (
                  <ToggleGroupItem
                    value={data.id.toString()}
                    key={index}
                    className="rounded-full font-semibold text-[12px] h-[20px] px-1 border-[1px] flex justify-center items-center mt-1 gap-2"
                  >
                    {data.name} <ChevronRight />
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-[20px] font-semibold">{totalResults} titles</p>
        <div className="flex flex-wrap gap-[32px]">
          {filterGenres?.map((movie: MovieType, id: number) => {
            return (
              <Link href={`/product/${movie.id}`} key={id}>
                <Card>
                  <CardContent>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      width={229.73}
                      height={340}
                      alt=""
                    />
                    <div className="p-2">
                      <div className="flex items-center">
                        <p>⭐️ {movie.vote_average.toFixed(1)}</p>
                        <p className="text-[#71717A] text-[12px]">/10</p>
                      </div>
                      <h2 className="text-[18px] ">{movie.original_title}</h2>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
      {/* <Pagination /> */}
    </div>
  );
}
