"use client";
import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

import { ArrowRight, SearchIcon } from "lucide-react";
import { TOKEN } from "../util/constant";
import { MovieType } from "../util/types";

export default function SearchTyping() {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState([]);

  const addHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLocaleLowerCase();
    setSearch(search);
    if (search == "") {
      setValue([]);
      return;
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=${1}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    setValue(data.results || []);
  };
  const clickHandler = () => {
    setSearch("");
    setValue([]);
  };

  return (
    <div className="relative">
      <div className="flex">
        <div className="absolute">
          <SearchIcon className="size-4 mt-3 mx-2 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={addHandler}
          className="w-[355px] h-[38px] rounded-lg py-3 pl-8 focus:outline-hidden flex items-center pt-3 border-[1px]"
        />
      </div>
      {search ? (
        <div className="absolute top-[40px] z-10">
          {value.slice(0, 5).map((movie: MovieType, index: number) => {
            return (
              <div key={index} className=" w-full">
                <Link
                  href={`/details/${movie.id}`}
                  onClick={() => clickHandler()}
                >
                  <Card className="w-[545px] gap-5 p-5 rounded-md hover:bg-secondary flex">
                    <img
                      className="w-[76px] h-[100px] rounded-lg"
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        movie?.poster_path
                      }
                    />
                    <button className="  text-[16px] " key={index}>
                      {movie?.title}
                      <div className=" text-[14px]">
                        ⭐️{movie.vote_average.toFixed(1)}/10
                      </div>
                      <div className=" gap-60 text-[14px]">
                        <div>{movie.release_date}</div>
                        <div className="flex justify-center">
                          See more <ArrowRight className="size-4 " />
                        </div>
                      </div>
                    </button>
                  </Card>
                </Link>
              </div>
            );
          })}
          <Link href={`/search`}>
            <Card className="h-[34px] flex items-center justify-center">
              See all results for " search "
            </Card>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
