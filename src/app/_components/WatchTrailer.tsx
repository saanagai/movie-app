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

export async function WatchTrailer({ movieId }: { movieId: number }) {
  const trailerData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const trailer = await trailerData.json();
  // console.log(trailer);
  const trailerUse = trailer.results.find((video: Trailer) => {
    return video.type === "Trailer";
  });
  console.log(trailerData);
  return (
    <Dialog>
      <DialogTrigger className="flex">
        <PlayIcon />
        Watch Trailer
      </DialogTrigger>
      <DialogContent className="max-w-xl w-[460px] h-[300px] p-0 border-0">
        <div>
          <iframe
            width="480"
            height="320"
            src={`https://www.youtube.com/embed/${trailerUse.key}`}
          ></iframe>
        </div>

        <DialogTitle className="hidden"></DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
