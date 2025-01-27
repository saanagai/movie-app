import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { MovieType } from "@/app/util/types";

const Page = ({ params}: {params: {movieId: string} }) => {
  const { movieId } = params;
  return (
    <div>
      <Button variant={"outline"} size={"sm"}>
        {movieId}
      </Button>
      <Link href={{`details/${movieId}`}}></Link>
    </div>
  );
};
