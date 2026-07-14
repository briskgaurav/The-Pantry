"use client";

import { forwardRef } from "react";

// The vault's tab-shaped control. One shape, reused for closing the panel
// and for stepping between categories. `rotate` turns the tab so it hangs
// off the matching edge (0 = down/close, 90 = left, -90 = right); `label`
// sits centered over the shape and stays upright regardless of rotation.
const TabButton = forwardRef(function TabButton(
  {
    label,
    ariaLabel,
    onClick,
    rotate = 0,
    direction = "y",
    className = "",
    labelClassName = "text-white group-hover:text-white",
    svgClassName = "text-foreground",
    ...rest
  },
  ref,
) {
  const isY = direction === "y";
  const firstSpanHover = isY ? "group-hover:-translate-y-full" : "group-hover:-translate-x-full";
  const secondSpanStart = isY ? "translate-y-full" : "translate-x-full";
  const secondSpanHover = isY ? "group-hover:translate-y-0" : "group-hover:translate-x-0";
  const accessibleName =
    ariaLabel ?? (typeof label === "string" ? label : undefined);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={accessibleName}
      className={`pointer-events-auto group relative flex min-h-6 min-w-6 max-md:mt-[-1px] cursor-pointer items-center justify-center ${className}`}
      {...rest}
    >
      <span
        className={`absolute z-10 overflow-hidden text-[.8vw] font-semibold tracking-[.15em] transition-colors max-md:text-[2.6vw] ${labelClassName}`}
        aria-hidden={typeof label !== "string" ? true : undefined}
      >
        <span className={`inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${firstSpanHover}`}>
          {label}
        </span>
        <span className={`absolute top-0 left-0 inline-block w-full text-center transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] max-md:hidden ${secondSpanStart} ${secondSpanHover}`}>
          {label}
        </span>
      </span>
      <svg
        className={`h-[2.5vw] w-auto max-md:h-[10vw] ${svgClassName}`}
        viewBox="0 0 213 43"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        focusable="false"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <path
          d="M212.193 0H0.410156C6.23784 0 9.15132 0 11.7798 0.823774C14.1062 1.55287 16.2603 2.74697 18.1113 4.33362C20.2027 6.12631 21.7466 8.59748 24.8345 13.5398L34.4054 28.8586C37.4933 33.801 39.0373 36.2721 41.1286 38.0648C42.9797 39.6515 45.1337 40.8456 47.4601 41.5747C50.0886 42.3984 53.0025 42.3984 58.8301 42.3984H154.38C160.409 42.3984 163.423 42.3984 166.124 41.5247C168.514 40.7515 170.716 39.4866 172.588 37.8114C174.703 35.9182 176.222 33.3142 179.259 28.1061L187.314 14.2923C190.351 9.08425 191.87 6.48023 193.985 4.587C195.857 2.91179 198.059 1.64694 200.449 0.873781C203.15 0 206.164 0 212.193 0Z"
          fill="var(--background)"
        />
      </svg>
    </button>
  );
});

export default TabButton;
