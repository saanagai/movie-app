"use client";
import { Play, PlayIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TOKEN } from "../util/constant";
import { Trailer } from "../util/trailerType";
import { useEffect, useState } from "react";
import { MovieType } from "../util/types";
import { Button } from "@/components/ui/button";

export function WatchTrailer({ movieId }: { movieId: number }) {
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  useEffect(() => {
    const getData = async () => {
      const trailerData = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const trailers = await trailerData.json();
      setTrailer(trailers.results[0] || []);
    };
    getData();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlayIcon />
          Watch Trailer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl w-[460px] h-[300px] p-0 border-0">
        <div>
          <iframe
            width="480"
            height="320"
            src={`https://www.youtube.com/embed/${trailer?.key}`}
          ></iframe>
        </div>

        <DialogTitle className="hidden"></DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
