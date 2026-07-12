"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroTagline({ hidden = false }) {
    const rootRef = useRef(null);

    // Fade + blur away while the view panel is open (and reverse).
    useGSAP(
        () => {
            gsap.to(rootRef.current, {
                autoAlpha: hidden ? 0 : 1,
                filter: hidden ? "blur(12px)" : "blur(0px)",
                duration: 0.5,
                ease: "power2.inOut",
                overwrite: true,
            });
        },
        { dependencies: [hidden] },
    );

    return (
        <div
            ref={rootRef}
            className="pointer-events-none absolute bottom-[2vw] left-[4vw] right-[4vw] z-10 flex items-end justify-between">
            {/* Left side: Logo */}
            <Link
                href="#"
                target="_blank"
                className="pointer-events-auto flex items-center gap-[.5vw] text-foreground transition-opacity hover:opacity-70"
            >
                <div className="h-[1.5vw] w-auto">
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
                <div className="text-[.8vw] font-medium uppercase">By Gaurav</div>
            </Link>

            <div className="">
                {/* Tagline text block */}
                <div className="rounded-2xl w-[32vw] leading-[1.2] text-foreground bg-background px-[2vw] py-[1.5vw]">
                    <p>
                        We serve delightful, interactive culinary models, transforming
                        simple ingredients into seamless and highly engaging 3D dining
                        experiences.
                    </p>
                </div>

                {/* CTA button */}
                <div className="ml-[15vw] relative flex items-center">
                    {/* Decorative tab shape */}
                    <p className="absolute text-foreground left-[3.4vw] mb-[.5vw]">
                        Scroll Down
                    </p>
                    <svg
                        className="h-[2.5vw] w-auto -ml-[1px] text-white"
                        viewBox="0 0 213 43"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M212.193 0H0.410156C6.23784 0 9.15132 0 11.7798 0.823774C14.1062 1.55287 16.2603 2.74697 18.1113 4.33362C20.2027 6.12631 21.7466 8.59748 24.8345 13.5398L34.4054 28.8586C37.4933 33.801 39.0373 36.2721 41.1286 38.0648C42.9797 39.6515 45.1337 40.8456 47.4601 41.5747C50.0886 42.3984 53.0025 42.3984 58.8301 42.3984H154.38C160.409 42.3984 163.423 42.3984 166.124 41.5247C168.514 40.7515 170.716 39.4866 172.588 37.8114C174.703 35.9182 176.222 33.3142 179.259 28.1061L187.314 14.2923C190.351 9.08425 191.87 6.48023 193.985 4.587C195.857 2.91179 198.059 1.64694 200.449 0.873781C203.15 0 206.164 0 212.193 0Z"
                            fill="var(--background)"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
