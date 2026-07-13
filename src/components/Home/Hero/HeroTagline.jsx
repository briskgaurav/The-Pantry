"use client";

import Link from "next/link";
import TabButton from "@/components/Home/Hero/TabButton";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

export default function HeroTagline({ hidden }) {
    const rootRef = useRef(null);
    const lenis = useLenis();

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
        <div ref={rootRef} className="absolute select-none bottom-[2vw] max-md:bottom-[5vw] left-[4vw] right-[4vw] z-200 flex items-end justify-between max-md:gap-[3vw] pointer-events-none">
            {/* Left side: Logo */}
            <Link
                href="#"
                target="_blank"
                className="pointer-events-auto max-md:hidden flex items-center gap-[.5vw] max-md:gap-[1.5vw] text-foreground transition-opacity hover:opacity-70"
            >
                <div className="h-[1.5vw] max-md:h-[4vw] w-auto">
                    <svg
                        className="h-full w-auto"
                        viewBox="0 0 13 25"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M12.9815 12.5046C12.9815 14.2556 12.9885 16.0066 12.9795 17.7576C12.9725 19.1046 12.5735 20.3336 11.7905 21.4296C10.9075 22.6676 9.73149 23.5016 8.26949 23.9246C7.51849 24.1416 6.75049 24.2116 5.97149 24.1476C4.85949 24.0566 3.83349 23.7106 2.91149 23.0836C1.39549 22.0526 0.460494 20.6316 0.118494 18.8266C0.0484941 18.4546 0.0174941 18.0786 0.0174941 17.6996C0.0174941 14.2316 0.0144941 10.7636 0.0194941 7.29558C0.0214941 5.92958 0.416494 4.67958 1.21449 3.56858C2.20449 2.18858 3.53649 1.31758 5.19949 0.963578C5.88249 0.818578 6.57249 0.794578 7.26749 0.877578C8.28649 0.999578 9.22949 1.33558 10.0785 1.91058C11.5755 2.92558 12.5115 4.31958 12.8685 6.09658C12.9455 6.48058 12.9825 6.86858 12.9825 7.25958C12.9825 9.00758 12.9825 10.7556 12.9825 12.5036L12.9815 12.5046ZM2.61049 12.4986C2.61049 14.2066 2.61049 15.9136 2.61049 17.6216C2.61049 18.0686 2.67149 18.5046 2.81449 18.9286C3.44749 20.8116 5.41049 21.9196 7.34849 21.4846C8.10249 21.3156 8.75349 20.9546 9.28949 20.3986C10.0255 19.6346 10.3915 18.7156 10.3925 17.6556C10.3955 14.2186 10.3945 10.7816 10.3915 7.34458C10.3915 7.12058 10.3735 6.89458 10.3365 6.67358C10.1595 5.64158 9.65249 4.80158 8.80749 4.18658C7.78249 3.43958 6.63949 3.23358 5.42149 3.58458C4.22749 3.92858 3.39249 4.70058 2.90349 5.84258C2.69449 6.33158 2.61149 6.84658 2.61149 7.37658C2.61249 9.08358 2.61149 10.7916 2.61149 12.4996L2.61049 12.4986Z"
                            fill="currentColor"
                        />
                        <path
                            d="M5.2085 13.7855V11.2095H7.7885V13.7815C7.7225 13.8025 5.3105 13.8075 5.2085 13.7855Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <div className="text12 font-medium uppercase">By Gaurav</div>
            </Link>

            <div className="pointer-events-auto">
                {/* Tagline text block */}
                <div className="rounded-2xl max-md:rounded-[3vw] w-[32vw] max-md:w-full leading-[1.2] text-foreground bg-background  px-[2vw] py-[1.5vw] max-md:px-[4vw] max-md:py-[5vw]">
                    <p className="text16 max-md:w-[90%] max-md:mx-auto max-md:text-center">
                        We serve delightful, interactive culinary models, transforming
                        simple ingredients into seamless and highly engaging 3D dining
                        experiences.
                    </p>
                </div>

                {/* CTA button */}
                <TabButton
                    label="Scroll Down"
                    onClick={() => {
                        if (lenis) lenis.scrollTo(window.innerHeight);
                    }}
                    className="ml-[15vw] max-md:left-1/2 max-md:-translate-x-1/2  max-md:ml-0!"
                    labelClassName="text-foreground text10 max-md:text-[2.5vw]! uppercase font-normal! transition-none max-md:pb-[2vw] pb-[.2vw]"
                    svgClassName="text-background"
                />
            </div>
        </div>
    );
}
