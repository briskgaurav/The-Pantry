'use client'

import { useState } from 'react'
import Experience from './Experience'
import HeroUI from './HeroUI'
import { DEFAULT_CATEGORY } from '../../utils/categories'

export default function Hero() {
  const [active, setActive] = useState(DEFAULT_CATEGORY)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(null)

  return (
    <section className='h-screen bg-background w-full p-[.5vw]'>
      <div className='bg-background  text-foreground relative h-full w-full overflow-hidden rounded-[2.5vw]'>
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
