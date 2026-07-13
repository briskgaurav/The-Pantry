"use client";

import { useState } from "react";
import Link from "next/link";
import Clock from "./Clock";
import SoundToggle from "./SoundToggle";
import NavMenu from "./NavMenu";
import TabButton from "../Hero/TabButton";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-[2vw] top-[2vw] max-md:left-[4vw] max-md:top-[4vw] max-md:w-[92vw] z-500 flex justify-center">
      <div className="relative max-md:w-full">
        <div className="relative w-fit max-md:w-full max-w-3xl rounded-[1.2vw] max-md:rounded-[3vw] bg-white text-black">
          <div className="flex items-center justify-between  gap-4 max-md:gap-[3vw] rounded-2xl p-[.8vw] max-md:p-[2.5vw]">
            <Link href="/" aria-label="logo" className="shrink-0 ml-[1vw] max-md:ml-[2vw]">
              <p className="text-[1vw] max-md:text-[3.5vw] font-bold">THE PANTRY</p>
            </Link>

            <div className="flex items-center gap-[1.5vw] max-md:gap-[4vw]">
              <span className="h-3 w-px bg-background/20" aria-hidden="true" />
              <SoundToggle />
              <span className="h-3 w-px bg-background/20" aria-hidden="true" />

              <Clock />
              <Link
                href="#"
                className=" rounded-[1vw] max-md:rounded-[2.5vw] hover:bg-background/70 ml-[.5vw] max-md:ml-[1vw] duration-300 transition-all bg-background  px-[1.5vw] py-[1vw] max-md:px-[3.5vw] max-md:py-[2.5vw] text10 max-md:text-[3vw]! max-md:font-semibold font-medium uppercase text-white"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>

          <NavMenu open={open} onNavigate={() => setOpen(false)} />
        </div>
        <TabButton
          label={open ? "CLOSE" : "MENU"}
          onClick={() => setOpen((v) => !v)}
          className="absolute bottom-0 left-[2vw] max-md:left-[22vw] "
          labelClassName="text-black/70 text12 group-hover:text-black"
          svgClassName="[&_path]:fill-white"
        />
      </div>
    </header>
  );
}
