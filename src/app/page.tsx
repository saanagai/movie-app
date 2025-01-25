import { MovieType } from "./util/types";
import { TOKEN } from "./util/constant";
import { MovieCard } from "./_components/MovieCard";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Header } from "./_components/Header";
import { UpcomingSee } from "./_components/UpcomingSee";
import { MovieCarousel } from "./_components/MovieCarousel";
import { FooterContent } from "./_components/FooterContent";
import { Popular } from "./_components/Popular";
import { TopRated } from "./_components/TopRated";

export default async function Home() {
  // const asd = await fetch(
  //   "https://api.themoviedb.org/3/movie/popular?language=enUS&page=1",
  //   {
  //     headers: {
  //       Authorization: `Bearer ${TOKEN}`,
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // const data = await asd.json();
  // console.log(data);
  // const { setTheme } = useTheme();
  return (
    <div>
      <Header />
      <MovieCarousel />
      <UpcomingSee />
      <Popular />
      <TopRated />
      <FooterContent />
    </div>
  );
}
