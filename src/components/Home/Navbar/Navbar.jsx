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
    <header className="fixed top-[2vw] left-[2vw] z-500 flex justify-center max-md:top-[4vw] max-md:left-[4vw] max-md:w-[92vw]">
      <div className="relative max-md:w-full">
        <div className="relative w-fit max-w-3xl rounded-[1.2vw] bg-white text-black max-md:w-full max-md:rounded-[3vw]">
          <div className="flex items-center justify-between gap-4 rounded-2xl p-[.8vw] max-md:gap-[3vw] max-md:p-[2.5vw]">
            <Link
              href="/"
              className="ml-[1vw] shrink-0 max-md:ml-[2vw]"
            >
              <p className="text-[1vw] font-bold max-md:text-[3.5vw]">THE PANTRY</p>
            </Link>

            <div className="flex items-center gap-[1.5vw] max-md:gap-[4vw]">
              <span className="h-3 w-px bg-background/20" aria-hidden="true" />
              <SoundToggle />
              <span className="h-3 w-px bg-background/20" aria-hidden="true" />

              <Clock />
              <Link
                href="#"
                className="text10 ml-[.5vw] rounded-[1vw] bg-background px-[1.5vw] py-[1vw] font-medium text-white uppercase transition-all duration-300 hover:bg-background/70 max-md:ml-[1vw] max-md:rounded-[2.5vw] max-md:px-[3.5vw] max-md:py-[2.5vw] max-md:text-[2.5vw]! max-md:font-semibold"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>

          <NavMenu open={open} onNavigate={() => setOpen(false)} />
        </div>
        <TabButton
          label={open ? "CLOSE" : "MENU"}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
          className="absolute bottom-0 left-[2vw] max-md:left-[22vw]"
          labelClassName="text-black text12 group-hover:text-black"
          svgClassName="[&_path]:fill-white"
        />
      </div>
    </header>
  );
}
