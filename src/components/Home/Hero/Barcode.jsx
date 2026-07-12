"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CITIES = ["New Delhi", "Mumbai", "Pune", "Hyderabad", "Lucknow", "Kota"];

export default function Barcode({ hidden }) {
    const rootRef = useRef(null);
    const [cityIdx, setCityIdx] = useState(0);

    // City slider ticker
    useEffect(() => {
        const interval = setInterval(() => {
            setCityIdx((i) => (i + 1) % CITIES.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    useGSAP(
        () => {
            if (hidden) {
                gsap.to(rootRef.current, {
                    autoAlpha: 0,
                    y: 10,
                    duration: 0.3,
                    overwrite: true,
                });
            } else {
                gsap.to(rootRef.current, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.3,
                    overwrite: true,
                });
            }
        },
        { dependencies: [hidden] },
    );

    return (
        <div ref={rootRef} className="absolute top-[3vw] right-[4vw] z-200 flex flex-col gap-[.6vw] text-foreground pointer-events-none select-none">
            <div className="h-[1.5vw] w-[10vw]">
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 112 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H2.11432V18H0V0ZM3.40837 18H4.5987V0H3.40837V18ZM5.45669 18H6.64467V0H5.45669V18ZM8.20742 18H10.8097V0H8.20742V18ZM12.8933 18H14.1945V0H12.8933V18ZM16.2121 18H21.6052V0H16.2121V18ZM30.2652 18H32.0377V0H30.2652V18ZM33.584 0V18H36V0H33.584ZM23.769 18H24.9287V0H23.769V18ZM26.5905 18H27.7501V0H26.5905V18Z" fill="currentColor"></path>
                    <path d="M38 0H40.1143V18H38V0ZM41.4084 18H42.5987V0H41.4084V18ZM43.4567 18H44.6447V0H43.4567V18ZM46.2074 18H48.8097V0H46.2074V18ZM50.8933 18H52.1945V0H50.8933V18ZM54.2121 18H59.6052V0H54.2121V18ZM68.2652 18H70.0377V0H68.2652V18ZM71.584 0V18H74V0H71.584ZM61.769 18H62.9287V0H61.769V18ZM64.5905 18H65.7501V0H64.5905V18Z" fill="currentColor"></path>
                    <path d="M76 0H78.1143V18H76V0ZM79.4084 18H80.5987V0H79.4084V18ZM81.4567 18H82.6447V0H81.4567V18ZM84.2074 18H86.8097V0H84.2074V18ZM88.8933 18H90.1945V0H88.8933V18ZM92.2121 18H97.6052V0H92.2121V18ZM106.265 18H108.038V0H106.265V18ZM109.584 0V18H112V0H109.584ZM99.769 18H100.929V0H99.769V18ZM102.59 18H103.75V0H102.59V18Z" fill="currentColor"></path>
                </svg>
            </div>
            <div className="flex justify-between items-center text-[.6vw] font-medium uppercase tracking-[.2em] opacity-80">
                <div className="relative overflow-hidden h-[1em] w-[7vw]">
                    <div 
                        className="absolute inset-0 flex flex-col transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)]"
                        style={{ transform: `translateY(-${cityIdx * 100}%)` }}
                    >
                        {CITIES.map((city, i) => (
                            <div key={i} className="h-[1em] flex-shrink-0 flex items-center">{city}</div>
                        ))}
                    </div>
                </div>
                <div>India</div>
            </div>
        </div>
    );
}
