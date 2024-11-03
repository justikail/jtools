"use client";
import Link from "next/link";
import Drawer from "@/components/templates/drawer";
import * as Uil from "@iconscout/react-unicons";
import { Mate } from "next/font/google";
import BtnIcon from "@/components/button/btnIcon";

const matemasie = Mate({
  subsets: ["latin"],
  weight: "400",
});

function Header() {
  const time = new Date().toLocaleTimeString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <header className="flex justify-between">
      <Drawer time={time} />
      <div className="hidden lg:flex items-center text-2xl font-bold text-white">
        <Link href={"/"} className={`${matemasie.className} underline`}>
          Jtools.
        </Link>
      </div>
      <ul className="flex items-center h-12">
        <BtnIcon goTo={"mailto:haikalsiregar0x1337@gmail.com"} icon={Uil.UilEnvelope} />
        <BtnIcon goTo={"//github.com/justikail"} icon={Uil.UilGithub} />
      </ul>
    </header>
  );
}

export default Header;
