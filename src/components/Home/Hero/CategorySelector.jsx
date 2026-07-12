"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CATEGORIES } from "@/components/Home/Hero/categories";

const N = CATEGORIES.length;
const CENTER = 2;
const STEP = 100;
const shortestDelta = (from, to) => {
  const d = (((to - from) % N) + N) % N;
  return d > N / 2 ? d - N : d;
};
const wrapX = (v) => {
  const period = STEP * N;
  const r = v % period;
  return r > 0 ? r - period : r;
};

const LOOP = [...CATEGORIES, ...CATEGORIES];

export default function CategorySelector({ active, setActive, view, setView }) {
  const activeIdx = Math.max(
    0,
    CATEGORIES.findIndex((c) => c.id === active),
  );

  // The view panel (lifted to Hero) is open exactly when a view is held.
  const open = view !== null;
  const stripRefs = useRef([]);
  const btnRefs = useRef([]);
  const posRef = useRef(null);
  if (posRef.current === null) posRef.current = { pos: activeIdx };

  // Blur + fade all category buttons out while the view panel is open.
  useGSAP(
    () => {
      const buttons = btnRefs.current.filter(Boolean);
      gsap.to(buttons, {
        autoAlpha: open ? 0 : 1,
        filter: open ? "blur(12px)" : "blur(0px)",
        duration: 0.5,
        ease: open ? "power2.inOut" : "power2.out",
        delay: open ? 0 : 0.1,
        stagger: 0.04,
        overwrite: true,
      });
    },
    { dependencies: [open] },
  );

  useGSAP(
    () => {
      const state = posRef.current;
      state.pos = ((state.pos % N) + N) % N;

      const render = () => {
        stripRefs.current.forEach((el, box) => {
          if (el)
            gsap.set(el, {
              xPercent: wrapX(-STEP * (state.pos + (box - CENTER))),
            });
        });
      };

      render();
      gsap.to(state, {
        pos: state.pos + shortestDelta(state.pos, activeIdx),
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: render,
        overwrite: true,
      });
    },
    { dependencies: [activeIdx] },
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-[1vw]">
      {Array.from({ length: N }).map((_, box) => {
        // Which category this window currently frames (center === active).
        const catIdx = (((activeIdx + (box - CENTER)) % N) + N) % N;
        const isCenter = box === CENTER;

        return (
          <button
            type="button"
            key={box}
            ref={(el) => {
              btnRefs.current[box] = el;
            }}
            onClick={() =>
              isCenter ? setView(0) : setActive(CATEGORIES[catIdx].id)
            }
            className={`pointer-events-auto cursor-pointer relative overflow-hidden rounded-full py-[.5vw] text-[.9vw] text-white ${
              isCenter ? "bg-black" : ""
            }`}
          >
            <span aria-hidden className="invisible grid">
              {CATEGORIES.map((item) => (
                <span
                  className="col-start-1 row-start-1 whitespace-nowrap px-[1.5vw]"
                  key={item.id}
                >
                  {item.label}
                </span>
              ))}
            </span>

            <span
              ref={(el) => {
                stripRefs.current[box] = el;
              }}
              className="absolute inset-0 flex items-center"
            >
              {LOOP.map((item, i) => (
                <span
                  className="shrink-0 grow-0 basis-full whitespace-nowrap text-center"
                  key={i}
                >
                  {item.label}
                </span>
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );
}
