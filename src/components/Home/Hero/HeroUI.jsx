"use client";

import dynamic from "next/dynamic";
import CategorySelector from "./CategorySelector";

const ViewPanel = dynamic(() => import("./ViewPanel"), { ssr: false });
const Barcode = dynamic(() => import("./Barcode"), { ssr: false });
const HeroTagline = dynamic(() => import("./HeroTagline"), { ssr: false });

export default function HeroUI({ active, setActive, view, setView, open, setOpen }) {
    return (
        <>
            <CategorySelector
                active={active}
                setActive={setActive}
                open={open}
                setOpen={setOpen}
            />
            <ViewPanel
                active={active}
                setActive={setActive}
                view={view}
                setView={setView}
                open={open}
                setOpen={setOpen}
            />
            <Barcode hidden={open} />
            <HeroTagline hidden={open} />
        </>
    );
}
