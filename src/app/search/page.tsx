"use client";

import { MovieType } from "@/app/util/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSearchParams } from "next/navigation";
import { genreType } from "../util/genreType";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchCards } from "../_components/SearchCards";
import { fetchdata } from "../util/inputData";
const Page = () => {
  // const { category } = await props.params;
  const searchParams = useSearchParams();
  const search = searchParams.get("value");
  const page = searchParams.get("page");

  // console.log(search);
  const [genres, setGenres] = useState<genreType[]>();
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const getSearchedMovie = async () => {
      const movieJson = await fetchdata(
        `/search/movie?query=${search}&language=en-US&page=${page}`
      );

      setMovies(movieJson.results);
    };

    const getData = async () => {
      const data = await fetchdata("/genre/movie/list?language=en");
      setGenres(data.genres);
    };
    getSearchedMovie();
    getData();
  }, []);
  console.log(movies);

  // const movies = data.genres;
  // console.log("genre", data);
  const router = useRouter();

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="w-full flex">
      <div>
        <h2 className="text-foreground text-2xl font-semibold mb-5">
          Search results
        </h2>
        <div>
          <h4 className="text-[22px] font-semibold">Search by genre</h4>
          <p>See lists of movies by genre</p>
        </div>
        <div className="flex flex-wrap gap-2 w-[1200px]">
          <SearchCards movies={movies} />
        </div>
      </div>
      <ToggleGroup
        type="multiple"
        className="flex flex-wrap border-t-2 gap-3 pt-[4px] w-[580px] h-[220px]"
      >
        {genres?.map((data: genreType, index: number) => {
          return (
            <ToggleGroupItem
              onClick={() => {
                handleClick();
                router.push(`/genres?genresId=${data?.id}`);
              }}
              value={data.id.toString()}
              key={index}
              className="rounded-full font-semibold text-[12px] h- px-1 border-[1px] flex justify-center items-center mt-[4px] gap-2"
            >
              {data.name} <ChevronRight />
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
};

export default Page;
