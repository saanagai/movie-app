import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TOKEN } from "../util/constant";
import { genreType } from "../util/genreType";
import { MovieType } from "../util/types";

export async function Genre() {
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
  console.log(data);
  const movies = data.genres;

  return (
    <div className="flex justify-evenly">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex border rounded-[8px] w-[85px] text-[14px]  font-bold justify-center items-center">
          <ChevronDown className="w-4" />
          Genre
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            Genres
            <p>See lists of movies by genre</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="w-[550px] flex flex-wrap gap-5 p-5">
            {movies.map((data: genreType, index: number) => {
              return (
                <DropdownMenuItem className=" border-[1px] rounded-full h-[20px]">
                  {data?.name}
                  <ChevronRight />
                </DropdownMenuItem>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
