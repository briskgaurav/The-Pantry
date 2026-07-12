'use client'

import { useState } from 'react'
import Experience from './Experience'
import FractalGlass from './FractalGlass'
import CategorySelector from './CategorySelector'
import ViewPanel from './ViewPanel'
import HeroTagline from './HeroTagline'
import { DEFAULT_CATEGORY } from './categories'

export default function Hero() {
  const [active, setActive] = useState(DEFAULT_CATEGORY)
  // null = idle. 0/1/2 = a held orientation from the view panel.
  const [view, setView] = useState(null)

  return (
    <section className='h-screen bg-background w-full p-[.5vw]'>
      <div className='bg-background  text-foreground relative h-full w-full overflow-hidden rounded-[2.5vw]'>
        {/* 3D layer — receives drags for orbit rotation */}
        <div className='absolute inset-0'>
          <Experience active={active} view={view} />
        </div>
        <FractalGlass />
        <CategorySelector
          active={active}
          setActive={setActive}
          view={view}
          setView={setView}
        />
        <ViewPanel view={view} setView={setView} />
        <HeroTagline hidden={view !== null} />
      </div>
    </section>
  )
}
