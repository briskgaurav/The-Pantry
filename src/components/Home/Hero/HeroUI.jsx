"use client";

import FractalGlass from "./FractalGlass";
import CategorySelector from "./CategorySelector";
import ViewPanel from "./ViewPanel";
import Barcode from "./Barcode";
import HeroTagline from "./HeroTagline";

export default function HeroUI({ active, setActive, view, setView, open, setOpen }) {
    return (
        <>
            <FractalGlass />
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
