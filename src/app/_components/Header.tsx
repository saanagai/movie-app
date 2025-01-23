import { ModeToggle } from "@/app/_components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Genre } from "./Genre";
import Image from "next/image";
import { Search } from "./Search";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <div className="flex justify-between">
      <Image
        className="w-[90px] h-[25px]"
        width={1000}
        height={1000}
        src="/logoLight.png"
        alt=""
      />
      <Genre />
      <div>
        <Input />
        <Search />
      </div>
      <ModeToggle />
    </div>
  );
}
