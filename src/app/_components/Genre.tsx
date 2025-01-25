import {
  DropdownMenu,
  DropdownMenuContent,
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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ChevronDown />
          Genre
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Genres</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {movies.map((data: genreType, index: number) => {
            return (
              <DropdownMenuItem>
                {data?.name}
                <ChevronRight />
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
