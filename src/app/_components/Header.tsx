import { Genre } from "./Genre";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ThemeChanger from "./ThemeChanger";
import SearchTyping from "./SearchTyping";

export function Header() {
  return (
    <div className="flex justify-between mt-10 mb-10">
      <Link href={`http://localhost:3000/`}>
        <Image
          className="w-[90px] h-[25px]"
          width={1000}
          height={1000}
          src="/logoLight.png"
          alt=""
        />
      </Link>
      <div className="flex gap-3">
        <Genre />
        <SearchTyping />
      </div>
      <ThemeChanger />
    </div>
  );
}
