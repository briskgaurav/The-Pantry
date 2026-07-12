"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { VIEWS, CATEGORIES } from "@/components/utils/categories";
import TabButton from "@/components/Home/Hero/TabButton";
import { useMobile } from "@/components/utils/useMobile";

gsap.registerPlugin(SplitText);

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
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const previewsRef = useRef(null);
  const firstRun = useRef(true);
  const prevOpen = useRef(false);
  const lenis = useLenis();
  const isMobile = useMobile();

  // The close tab hangs down from the top edge on desktop, but on mobile the
  // navbar owns the top, so it is anchored to the bottom edge and points up.
  // Its hidden state therefore has to slide off the matching edge: up (-100%)
  // on desktop, down (+100%) on mobile.
  const closeHidden = isMobile ? 100 : -100;

  // Freeze the page behind the vault: Lenis scrolling is suspended while the
  // panel is open and resumed once it closes.
  useEffect(() => {
    if (!lenis) return;
    if (open) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [open, lenis]);

  const activeIdx = Math.max(
    0,
    CATEGORIES.findIndex((c) => c.id === active),
  );
  const model = CATEGORIES[activeIdx] ?? CATEGORIES[0];


  const cycle = (dir) => {
    const n = CATEGORIES.length;
    setActive(CATEGORIES[((activeIdx + dir) % n + n) % n].id);
  };


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
        gsap.set(closeRef.current, { yPercent: closeHidden });
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
          yPercent: closeHidden,
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
    { dependencies: [open, closeHidden] },
  );

  useGSAP(
    () => {
      const justOpened = open && !prevOpen.current;
      prevOpen.current = open;
      if (!open) return;

      const splits = [titleRef.current, descRef.current]
        .filter(Boolean)
        .map((el) => SplitText.create(el, { type: "lines", mask: "lines" }));

      const lines = splits.flatMap((s) => s.lines);


      const base = justOpened ? 0.55 : 0;

      gsap.from(lines, {
        yPercent: 110,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.07,
        delay: base,
      });

      const previews = previewsRef.current
        ? Array.from(previewsRef.current.children)
        : [];

      gsap.fromTo(
        previews,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          transformOrigin: "50% 100%",
          duration: 0.55,
          ease: "back.out(2.2)",
          stagger: 0.06,
          delay: base,
          overwrite: true,
        },
      );

      return () => splits.forEach((s) => s.revert());
    },
    { dependencies: [active, open], scope: panelRef },
  );

  return (
    <>
      <div
        ref={panelRef}
        className="pointer-events-none absolute left-1/2 bottom-[1vw] max-md:bottom-[12vw] z-20 -translate-x-1/2"
      >
        <div className="pointer-events-auto max-md:min-h-[75vw] w-[80vw] max-md:w-[92vw] rounded-[1.2vw] max-md:rounded-[3vw] bg-background px-[2.5vw] py-[1.5vw] max-md:px-[5vw] max-md:py-[6vw] text-foreground">
          <div ref={contentRef} className="flex flex-col items-stretch">
            <div className="flex items-center justify-between gap-[3vw] max-md:flex-col max-md:items-stretch max-md:gap-[6vw]">
              <div className="flex items-center w-fit gap-[2vw] max-md:w-full max-md:flex-col max-md:items-start max-md:gap-[3vw]">

                <h3
                  key={`title-${active}`}
                  ref={titleRef}
                  className="w-[13vw] max-md:text-center max-md:w-full shrink-0 text24 leading-[1.1]"
                >
                  {model.label}
                </h3>

                {/* Description — about the selected model */}
                <p
                  key={`desc-${active}`}
                  ref={descRef}
                  className=" w-[35vw] max-md:text-center max-md:w-full text16 leading-[1.5] text-foreground/70"
                >
                  {model.info}
                </p>
              </div>


              {/* Preview boxes — image previews for each view of the model */}
              <div ref={previewsRef} className="flex shrink-0 items-stretch gap-[.8vw] max-md:gap-[2vw] max-md:justify-center">
                {VIEWS.map((v, i) => {
                  const isActive = view === i;
                  return (

                    <div key={v.id} className="will-change-transform">
                      <button
                        type="button"
                        onClick={() => setView(i)}
                        aria-label={v.label}
                        className={`relative overflow-hidden rounded-[.8vw] max-md:rounded-[2.5vw] bg-foreground/[0.07] ring-2 transition-all duration-300 ${isActive
                          ? "h-[8vw] w-[8vw] max-md:h-[26vw] max-md:w-[26vw] ring-foreground"
                          : "h-[8vw] w-[5vw] max-md:h-[26vw] max-md:w-[18vw] ring-foreground/10 hover:ring-foreground/25"
                          }`}
                      >
                        <Image
                          src={model.previews[i]}
                          alt={`${model.label} — ${v.label}`}
                          width={200}
                          height={200}
                          className="object-cover h-full w-full"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-[-5vw] max-md:left-[-20vw] top-1/2 z-30 -translate-y-1/2 max-md:top-[40%]">
        <TabButton
          ref={leftRef}
          label={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[1.2vw] h-[1.2vw] max-md:w-[3.5vw] max-md:h-[3.5vw]">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          }
          rotate={-90}
          onClick={() => cycle(-1)}
        />
      </div>

      <div className="pointer-events-none absolute right-[-5vw] max-md:right-[-20vw] max-md:top-[40%] top-1/2 z-30 -translate-y-1/2">
        <TabButton
          ref={rightRef}
          label={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[1.2vw] h-[1.2vw] max-md:w-[3.5vw] max-md:h-[3.5vw]">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          }
          rotate={90}
          onClick={() => cycle(1)}
        />
      </div>

      <div className="pointer-events-none absolute top-0 max-md:top-auto max-md:bottom-[0vw] left-1/2 z-30 -translate-x-1/2">
        <TabButton
          ref={closeRef}
          label="CLOSE"
          onClick={close}
          svgClassName="max-md:rotate-180"
        />
      </div>
    </>
  );
}
