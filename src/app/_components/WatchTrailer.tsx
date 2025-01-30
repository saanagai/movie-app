import { Play, PlayIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TOKEN } from "../util/constant";

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
  console.log(trailer);
  return (
    <Dialog>
      <DialogTrigger className="flex">
        <PlayIcon />
        Watch Trailer
      </DialogTrigger>
      <DialogContent className="">
        <div>
          <iframe
            width="760"
            height="428"
            src={`https://www.youtube.com/embed/${trailer.results?.key}`}
          ></iframe>
        </div>

        <DialogTitle>Edit profile</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
