"use client";

import { Button } from "@/components/ui/button";
import { MovieType } from "../util/types";
import { Play } from "lucide-react";

export function WatchTrailer({
  title,
  vote_average,
  overview,
}: {
  title: string;
  vote_average: number;
  overview: string;
}) {
  return (
    <div className="absolute top-5 left-5 text-white p-5 gap-5">
      <p className="text-base">Now Playing:</p>
      <p className="font-bold text-4xl">{title}</p>
      <p className="text-lg mb-5">⭐️{vote_average}</p>
      <p className="w-[300px] text-xs mb-5">{overview}</p>

      <Button variant={`secondary`}>
        <Play />
        Watch Trailer
      </Button>
    </div>
  );
}
