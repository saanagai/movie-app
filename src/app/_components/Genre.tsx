"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TOKEN } from "../util/constant";
import { genreType } from "../util/genreType";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function Genre() {
  const [movies, setMovies] = useState<genreType[]>();
  const [active, setActive] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const genre = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await genre.json();
      setMovies(data.genres);
    };
    getData();
  }, []);

  // const movies = data.genres;
  // console.log("genre", data);
  const router = useRouter();

  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div className="flex">
      <DropdownMenu open={active} onOpenChange={handleClick}>
        <DropdownMenuTrigger className="flex rounded-full w-[85px] text-[14px] font-bold justify-center items-center">
          <ChevronDown className="w-4" />
          Genre
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            Genres
            <p>See lists of movies by genre</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ToggleGroup
            type="multiple"
            className="flex flex-wrap border-t-2 gap-3 pt-[4px] w-[580px] h-[220px]"
          >
            {movies?.map((data: genreType, index: number) => {
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
