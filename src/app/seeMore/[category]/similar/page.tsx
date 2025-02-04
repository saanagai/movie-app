import { TOKEN } from "@/app/util/constant";
import { MovieType } from "@/app/util/types";
import Image from "next/image";
import Link from "next/link";

const Page = async (props: { params: Promise<{ category: string }> }) => {
  const { category } = await props.params;
  //   /movie/${id}/similar?language=en-US&page=1
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log({ data });
  return (
    <div>
      <p className="text-foreground text-2xl font-semibold mb-5">
        More This Like
      </p>
      <div className="grid grid-cols-5 gap-[32px] max-w-[1440px]">
        {data.results?.slice(0, 20).map((d: MovieType, index: number) => {
          return (
            <Link
              href={`/details/${d.id}`}
              key={d.id}
              className="w-[239px] h-[470px] bg-secondary rounded-[6px] overflow-hidden"
            >
              <div className=" max-w-[239px] h-[340px] ">
                <Image
                  width={1000}
                  height={1000}
                  className="size-76"
                  src={`https://image.tmdb.org/t/p/w500${d.poster_path}`}
                  alt={d.original_title}
                />
              </div>
              <div className="p-4">
                <div className="text-[12px] mt-6 flex align-middle">
                  <img src="/star.svg" alt="" />
                  <p>
                    <span className="text-[14px] font-bold">
                      {" "}
                      {d.vote_average?.toFixed(1)}
                    </span>{" "}
                    /10
                  </p>
                </div>

                <h2 className="flex flex-col gap-6 text-[14px]">
                  {d.original_title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
      {/* <Pagination /> */}
    </div>
  );
};

export default Page;
