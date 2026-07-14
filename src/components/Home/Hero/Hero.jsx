'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import HeroUI from './HeroUI'
import { DEFAULT_CATEGORY } from '../../utils/categories'

const Experience = dynamic(() => import('./Experience'), { ssr: false })

export default function Hero() {
  const [active, setActive] = useState(DEFAULT_CATEGORY)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(0)

  return (
    <section id='PantrySection' className='h-dvh bg-background max-md:p-[1.5vw]  w-full p-[.5vw]'>
      {/* THIS IS FOR SEO */}
      <h1 className='sr-only'>The Pantry — interactive culinary models</h1>
      <div className='bg-background  text-foreground relative h-full w-full overflow-hidden rounded-[2.5vw] max-md:rounded-[5vw]'>
        <div className='absolute inset-0'>
          <Experience active={active} view={view} open={open} />
        </div>
        <HeroUI
          active={active}
          setActive={setActive}
          view={view}
          setView={setView}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </section>
  )
}
