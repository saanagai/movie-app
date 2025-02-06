"use client";

import { MovieType } from "@/app/util/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { genreType } from "../util/genreType";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { TOKEN } from "../util/constant";
import { useRouter } from "next/navigation";
const Page = (props: { params: Promise<{ category: string }> }) => {
  // const { category } = await props.params;
  const searchParams = useSearchParams();
  const search = searchParams.get("value");

  // console.log(search);
  const [genres, setGenres] = useState<genreType[]>();
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
      setGenres(data.genres);
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
    <div>
      <Link href={`/search?value`}>
        <p className="text-foreground text-2xl font-semibold mb-5">
          Search results
        </p>
      </Link>
      <div>
        <h4 className="text-[22px] font-semibold">Search by genre</h4>
        <p>See lists of movies by genre</p>
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
