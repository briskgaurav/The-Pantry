"use client";

import { useState, useEffect } from "react";

// Matches the --breakpoint-md token in globals.css.
const MOBILE_QUERY = "(max-width: 1025px)";

// Returns true when the viewport is at or below the mobile breakpoint (1025px).
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mql.matches);

    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isMobile;
}
