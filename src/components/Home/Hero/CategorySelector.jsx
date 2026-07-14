"use client";

import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { CATEGORIES } from "@/components/utils/categories";
import { useMobile } from "@/components/utils/useMobile";

gsap.registerPlugin(Draggable);

const N = CATEGORIES.length;
// Number of category buttons framed at once: 5 on desktop, 3 on mobile.
const DESKTOP_WINDOWS = N;
const MOBILE_WINDOWS = 3;
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
const wrapIdx = (i) => ((i % N) + N) % N;

const LOOP = [...CATEGORIES, ...CATEGORIES];

export default function CategorySelector({ active, setActive, open, setOpen }) {
  const isMobile = useMobile();
  const WINDOWS = isMobile ? MOBILE_WINDOWS : DESKTOP_WINDOWS;
  const CENTER = (WINDOWS - 1) / 2;

  const activeIdx = Math.max(
    0,
    CATEGORIES.findIndex((c) => c.id === active),
  );

  const containerRef = useRef(null);
  const proxyRef = useRef(null);
  const stripRefs = useRef([]);
  const btnRefs = useRef([]);
  const dragRef = useRef(null);
  const posRef = useRef(null);
  if (posRef.current === null) posRef.current = { pos: activeIdx };
  // Kept in a ref so the drag handlers (captured once) always read the
  // current center after a desktop/mobile switch changes the window count.
  // Synced in the snap effect below, which re-runs whenever isMobile flips.
  const centerRef = useRef(CENTER);

  // Paint every window's strip from the shared floating position, so the
  // idle snap animation and the live drag both drive the exact same render.
  const render = () => {
    const { pos } = posRef.current;
    const center = centerRef.current;
    stripRefs.current.forEach((el, box) => {
      if (el)
        gsap.set(el, {
          xPercent: wrapX(-STEP * (pos + (box - center))),
        });
    });
  };

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

  // Settle the odometer onto the active category whenever it changes
  // (via click, drag release, or an external state update).
  useGSAP(
    () => {
      centerRef.current = CENTER;
      const state = posRef.current;
      state.pos = wrapIdx(state.pos);

      render();
      gsap.to(state, {
        pos: state.pos + shortestDelta(state.pos, activeIdx),
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: render,
        overwrite: true,
      });
    },
    { dependencies: [activeIdx, isMobile] },
  );

  // Horizontal drag to scroll through categories, snapping to the nearest
  // one on release. The whole hero viewport is the drag surface; a tap
  // without movement still fires a button's onClick.
  useGSAP(
    () => {
      const state = posRef.current;
      let startPos = 0;
      let startX = 0;
      let pxPerStep = 1;

      const [instance] = Draggable.create(proxyRef.current, {
        type: "x",
        // Drag anywhere on the hero, not just the category band.
        trigger: ["#pantry-section", containerRef.current],
        dragClickables: true,
        onPress() {
          gsap.killTweensOf(state);
          startPos = state.pos;
          startX = this.x;
          // Distance between two adjacent windows == one category step,
          // so the label you grab tracks the pointer naturally.
          const a = btnRefs.current[0]?.getBoundingClientRect();
          const b = btnRefs.current[1]?.getBoundingClientRect();
          pxPerStep =
            a && b
              ? Math.abs(b.left + b.width / 2 - (a.left + a.width / 2))
              : window.innerWidth / N;
        },
        onDrag() {
          state.pos = startPos - (this.x - startX) / pxPerStep;
          render();
        },
        onDragEnd() {
          const target = Math.round(state.pos);
          gsap.to(state, {
            pos: target,
            duration: 0.4,
            ease: "power2.out",
            onUpdate: render,
            overwrite: true,
          });
          setActive(CATEGORIES[wrapIdx(target)].id);
        },
      });

      dragRef.current = instance;
      return () => instance.kill();
    },
    { dependencies: [] },
  );

  // The panel being open hides the buttons, so drag should be inert then.
  useGSAP(
    () => {
      const instance = dragRef.current;
      if (!instance) return;
      if (open) instance.disable();
      else instance.enable();
    },
    { dependencies: [open] },
  );

  return (
    <div
      ref={containerRef}
      inert={open ? true : undefined}
      aria-hidden={open || undefined}
      className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-[1vw] max-md:px-[2vw]"
    >
      <div ref={proxyRef} className="pointer-events-none absolute h-px w-px opacity-0" />

      {Array.from({ length: WINDOWS }).map((_, box) => {
        // Which category this window currently frames (center === active).
        const catIdx = wrapIdx(activeIdx + (box - CENTER));
        const isCenter = box === CENTER;

        return (
          <button
            type="button"
            key={box}
            ref={(el) => {
              btnRefs.current[box] = el;
            }}
            onClick={() =>
              isCenter ? setOpen(true) : setActive(CATEGORIES[catIdx].id)
            }
            aria-label={
              isCenter
                ? `Open ${CATEGORIES[catIdx].label} details`
                : `Select ${CATEGORIES[catIdx].label}`
            }
            aria-current={isCenter ? "true" : undefined}
            tabIndex={open ? -1 : 0}
            className={`pointer-events-auto cursor-pointer relative overflow-hidden rounded-full py-[.5vw] max-md:py-[2vw] text12 font-semibold text-white min-h-6 ${isCenter ? "bg-black" : ""
              }`}
          >
            <span aria-hidden className="invisible grid">
              {CATEGORIES.map((item) => (
                <span
                  className="col-start-1 row-start-1 whitespace-nowrap px-[1.5vw] max-md:px-[3vw]"
                  key={item.id}
                >
                  {isMobile && item.mobileLabel ? item.mobileLabel : item.label}
                </span>
              ))}
            </span>

            <span
              ref={(el) => {
                stripRefs.current[box] = el;
              }}
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              {LOOP.map((item, i) => (
                <span
                  className="shrink-0 grow-0 basis-full whitespace-nowrap text-center"
                  key={i}
                >
                  {isMobile && item.mobileLabel ? item.mobileLabel : item.label}
                </span>
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );
}
