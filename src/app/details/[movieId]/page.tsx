import { TOKEN } from "@/app/util/constant";
import { createdType } from "@/app/util/createdType";
import { genreType } from "@/app/util/genreType";
import { MovieType } from "@/app/util/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default async function page1({
  params: { movieId },
}: {
  params: { movieId: string };
}) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const responseStar = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const responseVideos = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-type": "application/json",
      },
    }
  );
  const similarData = await fetch(
    ` https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-type": "application/json",
      },
    }
  );

  const data = await response.json();
  // console.log(data);
  const dataStar = await responseStar.json();
  console.log(dataStar);
  const dataVideos = await responseVideos.json();
  console.log(dataVideos);
  const dataSimilar = await similarData.json();
  // console.log(similarData);
  return (
    <div className="max-w-[1280px] m-auto">
      <div>
        <h1 className="text-[36px] font-bold">{data.original_title}</h1>
        <h2 className="text-[14px]">{data.release_date}</h2>
        {/* <p>{}</p> */}
        <Image
          width={1000}
          height={1000}
          src={"https://image.tmdb.org/t/p/w500" + data.poster_path}
          alt=""
          className="w-[290px] h-[428px] rounded-sm"
        />
        <div className="flex flex-col  gap-[5px]">
          <p className="flex gap-3">
            {data.genres.map((genre: genreType, id: number) => {
              return <div>{genre.name}</div>;
            })}
          </p>

          <p className="text-[16px]">{data.overview}</p>
          <h2 className="border-b-[1px] text-[16px] font-bold">Director:</h2>
          <p className=" flex border-b-[1px] text-[16px] font-bold">
            Stars:
            {dataStar.cast.slice(0, 1).map((movie: createdType, id: number) => {
              return <div>{movie.original_name}</div>;
            })}
          </p>
        </div>
        <div>
          <h2 className="border-b-[1px] text-[16px] flex gap-16">
            <p className="text-[16px] w-[64px] font-bold"> Writers</p>
            {dataStar.crew.slice(0, 1).map((movie: createdType, id: number) => {
              return <div>{movie.original_name}</div>;
            })}
          </h2>
        </div>
        <div>
          <h2 className="border-b-[1px] text-[16px]  flex gap-16">
            <p className="w-[64px] font-bold">Stars</p>
            {dataStar.cast.slice(0, 5).map((movie: createdType, id: number) => {
              return <div>·{movie.original_name}</div>;
            })}
          </h2>
        </div>
        <div className="flex gap-8 mt-20 mb-20">
          {dataSimilar.results
            .slice(0, 5)
            .map((movie: MovieType, id: number) => {
              return (
                <Card>
                  <div>
                    <div>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        width={229.73}
                        height={340}
                        alt=""
                      />
                    </div>
                    <div className="p-2">
                      <div className=" flex items-center">
                        <p>⭐️ {movie.vote_average.toFixed(1)}</p>
                        <p className="text-[#71717A] text-[12px]">/10</p>
                      </div>
                      <h2 className="text-[18px]">{movie.original_title}</h2>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
}
