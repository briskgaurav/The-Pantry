"use client";

import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { CATEGORIES } from "@/components/utils/categories";
import { useMobile } from "@/components/utils/useMobile";

gsap.registerPlugin(Draggable);

const COUNT = CATEGORIES.length;
const STEP = 100;
const LOOP = [...CATEGORIES, ...CATEGORIES];

function wrapIndex(i) {
  return ((i % COUNT) + COUNT) % COUNT;
}

// Shortest distance around the loop (can be negative).
function shortestPath(from, to) {
  const delta = (((to - from) % COUNT) + COUNT) % COUNT;
  return delta > COUNT / 2 ? delta - COUNT : delta;
}

// Keep strip xPercent in a stable wrap range.
function wrapPercent(value) {
  const period = STEP * COUNT;
  const remainder = value % period;
  return remainder > 0 ? remainder - period : remainder;
}

function getLabel(item, isMobile) {
  return isMobile && item.mobileLabel ? item.mobileLabel : item.label;
}

export default function CategorySelector({ active, setActive, open, setOpen }) {
  const isMobile = useMobile();
  const windowCount = isMobile ? 3 : COUNT;
  const centerSlot = (windowCount - 1) / 2;

  const activeIndex = Math.max(
    0,
    CATEGORIES.findIndex((c) => c.id === active),
  );

  const containerRef = useRef(null);
  const proxyRef = useRef(null);
  const stripRefs = useRef([]);
  const buttonRefs = useRef([]);
  const dragRef = useRef(null);
  const centerRef = useRef(centerSlot);
  const positionRef = useRef({ pos: activeIndex });

  const syncStrips = () => {
    const { pos } = positionRef.current;
    const center = centerRef.current;

    stripRefs.current.forEach((strip, slot) => {
      if (!strip) return;
      gsap.set(strip, {
        xPercent: wrapPercent(-STEP * (pos + (slot - center))),
      });
    });
  };

  // Hide buttons when the detail panel is open.
  useGSAP(
    () => {
      const buttons = buttonRefs.current.filter(Boolean);
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

  // Animate strips to the active category.
  useGSAP(
    () => {
      centerRef.current = centerSlot;
      const state = positionRef.current;
      state.pos = wrapIndex(state.pos);

      syncStrips();
      gsap.to(state, {
        pos: state.pos + shortestPath(state.pos, activeIndex),
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: syncStrips,
        overwrite: true,
      });
    },
    { dependencies: [activeIndex, isMobile] },
  );

  // Drag across the hero to scrub categories.
  useGSAP(
    () => {
      const state = positionRef.current;
      let startPos = 0;
      let startX = 0;
      let pxPerStep = 1;

      const [draggable] = Draggable.create(proxyRef.current, {
        type: "x",
        trigger: ["#pantry-section", containerRef.current],
        dragClickables: true,
        onPress() {
          gsap.killTweensOf(state);
          startPos = state.pos;
          startX = this.x;

          const first = buttonRefs.current[0]?.getBoundingClientRect();
          const second = buttonRefs.current[1]?.getBoundingClientRect();
          pxPerStep =
            first && second
              ? Math.abs(
                  second.left +
                    second.width / 2 -
                    (first.left + first.width / 2),
                )
              : window.innerWidth / COUNT;
        },
        onDrag() {
          state.pos = startPos - (this.x - startX) / pxPerStep;
          syncStrips();
        },
        onDragEnd() {
          const next = Math.round(state.pos);
          gsap.to(state, {
            pos: next,
            duration: 0.4,
            ease: "power2.out",
            onUpdate: syncStrips,
            overwrite: true,
          });
          setActive(CATEGORIES[wrapIndex(next)].id);
        },
      });

      dragRef.current = draggable;
      return () => draggable.kill();
    },
    { dependencies: [] },
  );

  useGSAP(
    () => {
      if (!dragRef.current) return;
      if (open) dragRef.current.disable();
      else dragRef.current.enable();
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
      <div
        ref={proxyRef}
        className="pointer-events-none absolute h-px w-px opacity-0"
      />

      {Array.from({ length: windowCount }).map((_, slot) => {
        const categoryIndex = wrapIndex(activeIndex + (slot - centerSlot));
        const category = CATEGORIES[categoryIndex];
        const isCenter = slot === centerSlot;

        return (
          <button
            type="button"
            key={slot}
            ref={(el) => {
              buttonRefs.current[slot] = el;
            }}
            onClick={() =>
              isCenter ? setOpen(true) : setActive(category.id)
            }
            aria-label={
              isCenter
                ? `Open ${category.label} details`
                : `Select ${category.label}`
            }
            aria-current={isCenter ? "true" : undefined}
            tabIndex={open ? -1 : 0}
            className={`pointer-events-auto cursor-pointer relative overflow-hidden rounded-full py-[.5vw] max-md:py-[2vw] text12 font-semibold text-white min-h-6 ${
              isCenter ? "bg-black" : ""
            }`}
          >
            {/* Invisible labels keep every button the same width */}
            <span aria-hidden className="invisible grid">
              {CATEGORIES.map((item) => (
                <span
                  className="col-start-1 row-start-1 whitespace-nowrap px-[1.5vw] max-md:px-[3vw]"
                  key={item.id}
                >
                  {getLabel(item, isMobile)}
                </span>
              ))}
            </span>

            <span
              ref={(el) => {
                stripRefs.current[slot] = el;
              }}
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              {LOOP.map((item, i) => (
                <span
                  className="shrink-0 grow-0 basis-full whitespace-nowrap text-center"
                  key={i}
                >
                  {getLabel(item, isMobile)}
                </span>
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );
}
