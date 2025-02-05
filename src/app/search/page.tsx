"use client";

import { MovieType } from "@/app/util/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const Page = (props: { params: Promise<{ category: string }> }) => {
  // const { category } = await props.params;
  const searchParams = useSearchParams();
  const search = searchParams.get("value");
  console.log(search);
  //   /movie/${id}/similar?language=en-US&page=1

  return (
    <div>
      <p className="text-foreground text-2xl font-semibold mb-5">
        Search results
      </p>
    </div>
  );
};

export default Page;
