"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { VIEWS } from "@/components/Home/Hero/categories";

export default function ViewPanel({ view, setView }) {
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const firstRun = useRef(true);
  const open = view !== null;

  useGSAP(
    () => {
      const panel = panelRef.current;
      const content = contentRef.current;

      if (firstRun.current) {
        firstRun.current = false;
        gsap.set(panel, { yPercent: 60, visibility: "hidden" });
        gsap.set(content, { opacity: 0 });
        return;
      }

      if (open) {
        gsap.set(panel, { visibility: "visible" });
        gsap.to(panel, {
          yPercent: 0,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        });
        gsap.to(content, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1,
          overwrite: true,
        });
      } else {
        gsap.to(content, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          overwrite: true,
        });
        gsap.to(panel, {
          yPercent: 60,
          duration: 0.35,
          ease: "power3.in",
          overwrite: true,
          onComplete: () => gsap.set(panel, { visibility: "hidden" }),
        });
      }
    },
    { dependencies: [open] },
  );

  return (
    <div
      ref={panelRef}
      className="pointer-events-none invisible absolute left-1/2 bottom-[6%] z-20 -translate-x-1/2"
    >
      <div className="pointer-events-auto rounded-[1.5vw] bg-black/70 px-[2vw] py-[1.2vw] text-white backdrop-blur-md">
        <div ref={contentRef} className="flex flex-col items-center gap-[1vw]">
          <div className="flex gap-[.6vw]">
            {VIEWS.map((v, i) => (
              <button
                type="button"
                key={v.id}
                onClick={() => setView(i)}
                className={`cursor-pointer rounded-full px-[1.4vw] py-[.5vw] text-[.8vw] transition-colors ${
                  view === i
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setView(null)}
            className="cursor-pointer text-[.7vw] uppercase tracking-[.2em] text-white/60 hover:text-white"
          >
            Close
          </button>
        </div>
       </div>
    </div>
  );
}
