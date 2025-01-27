import { ModeToggle } from "@/app/_components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Genre } from "./Genre";
import Image from "next/image";
import { Search } from "./Search";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <div className="flex justify-between mt-10 mb-10">
      <Image
        className="w-[90px] h-[25px]"
        width={1000}
        height={1000}
        src="/logoLight.png"
        alt=""
      />
      <div className="flex gap-3">
        <Genre />
        <Input />
      </div>
      <ModeToggle />
    </div>
  );
}
