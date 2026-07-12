"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { VIEWS, CATEGORIES } from "@/components/utils/categories";
import TabButton from "@/components/Home/Hero/TabButton";

export default function ViewPanel({
  active,
  setActive,
  view,
  setView,
  open,
  setOpen,
}) {
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const closeRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const firstRun = useRef(true);
  // The panel's title and description describe the currently selected model.
  const activeIdx = Math.max(
    0,
    CATEGORIES.findIndex((c) => c.id === active),
  );
  const model = CATEGORIES[activeIdx] ?? CATEGORIES[0];

  // Step to the neighbouring category while the vault stays open, so the
  // left/right tabs flip through models in place.
  const cycle = (dir) => {
    const n = CATEGORIES.length;
    setActive(CATEGORIES[((activeIdx + dir) % n + n) % n].id);
  };

  // Closing resets the held orientation so the vault always reopens frozen
  // in place rather than snapping to the last-used view.
  const close = () => {
    setView(null);
    setOpen(false);
  };

  useGSAP(
    () => {
      const panel = panelRef.current;
      const content = contentRef.current;

      const sides = [leftRef.current, rightRef.current];

      if (firstRun.current) {
        firstRun.current = false;
        gsap.set(panel, { yPercent: 200 });
        gsap.set(content, { opacity: 0 });
        gsap.set(closeRef.current, { yPercent: -100 });
        gsap.set(leftRef.current, { xPercent: -100 });
        gsap.set(rightRef.current, { xPercent: 100 });
        return;
      }

      if (open) {
        gsap.to(panel, {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          delay: 0.3,
          overwrite: true,
        });
        gsap.to(content, {
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.5,
          overwrite: true,
        });
        // Close tab rises into place on Y; the prev/next tabs slide in
        // from their own edges.
        gsap.to(closeRef.current, {
          yPercent: 0,
          duration: 0.8,
          ease: "power4.out",
          delay: 0.4,
          overwrite: true,
        });
        gsap.to(sides, {
          xPercent: 0,
          duration: 0.8,
          ease: "power4.out",
          delay: 0.45,
          overwrite: true,
        });
      } else {
        gsap.to(content, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          overwrite: true,
        });
        gsap.to(panel, {
          yPercent: 200,
          duration: 0.8,
          ease: "power3.inOut",
          overwrite: true,
        });
        gsap.to(closeRef.current, {
          yPercent: -100,
          duration: 0.5,
          ease: "power3.inOut",
          overwrite: true,
        });
        gsap.to(sides, {
          xPercent: (i) => (i === 0 ? -200 : 200),
          duration: 0.5,
          ease: "power3.inOut",
          overwrite: true,
        });
      }
    },
    { dependencies: [open] },
  );

  return (
    <>
      <div
        ref={panelRef}
        className="pointer-events-none absolute left-1/2 bottom-[1vw] z-20 -translate-x-1/2"
      >
        <div className="pointer-events-auto w-[80vw] rounded-[1.2vw] bg-background px-[2.5vw] py-[1.5vw] text-foreground">
          <div ref={contentRef} className="flex flex-col items-stretch">
            <div className="flex items-center gap-[3vw]">
              {/* Title — the selected model */}
              <h3 className="w-[11vw] shrink-0 text-[1.8vw] font-semibold leading-[1.1]">
                {model.label}
              </h3>

              {/* Description — about the selected model */}
              <p className="flex-1 text-[1vw] leading-[1.5] text-foreground/70">
                {model.info}
              </p>

              {/* Preview boxes — replace numbers with images later */}
              <div className="flex shrink-0 items-stretch gap-[.8vw]">
                {VIEWS.map((v, i) => {
                  const isActive = view === i;
                  return (
                    <button
                      type="button"
                      key={v.id}
                      onClick={() => setView(i)}
                      aria-label={v.label}
                      className={`flex items-center justify-center rounded-[.8vw] bg-foreground/[0.07] font-semibold text-foreground/40 ring-1 transition-all duration-300 hover:text-foreground/80 ${isActive
                        ? "h-[8vw] w-[8vw] text-[2.2vw] ring-foreground/40"
                        : "h-[8vw] w-[5vw] text-[1.6vw] ring-foreground/10 hover:ring-foreground/25"
                        }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Prev category — tab hanging off the left edge, flat edge outward */}
      <div className="pointer-events-none absolute left-[-5vw] top-1/2 z-30 -translate-y-1/2">
        <TabButton
          ref={leftRef}
          label={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[1.2vw] h-[1.2vw]">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          }
          rotate={-90}
          onClick={() => cycle(-1)}
        />
      </div>

      <div className="pointer-events-none absolute right-[-5vw] top-1/2 z-30 -translate-y-1/2">
        <TabButton
          ref={rightRef}
          label={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[1.2vw] h-[1.2vw]">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          }
          rotate={90}
          onClick={() => cycle(1)}
        />
      </div>

      <div className="pointer-events-none absolute top-0 left-1/2 z-30 -translate-x-1/2">
        <TabButton
          ref={closeRef}
          label="CLOSE"
          onClick={close}
        />
      </div>
    </>
  );
}
