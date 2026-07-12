"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

const LenisSmoothScroll = ({
  duration = 1.5,
  lerp = 0.075,
  smoothWheel = true,
  wheelMultiplier = 0.8,
  touchMultiplier = .9,
}) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Always start at the top on reload instead of restoring scroll position.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const toTop = () => {
      lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };

    // Re-assert across the moments production actually shifts: now, on the
    // next frame (once Lenis has initialized), and after every asset has
    // loaded and grown the page.
    toTop();
    const raf = requestAnimationFrame(toTop);
    window.addEventListener("load", toTop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", toTop);
    };
  }, []);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: duration,
        lerp: lerp,
        syncTouch: true,
        smoothWheel: smoothWheel,
        wheelMultiplier: wheelMultiplier,
        touchMultiplier: touchMultiplier,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
      ref={lenisRef}
    />
  );
};

export default LenisSmoothScroll;