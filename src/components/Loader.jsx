'use client'

import { useProgress } from '@react-three/drei'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { signalLoaderDone } from './utils/loaderReveal'
import { useMobile } from './utils/useMobile'

export default function Loader() {
  const { progress, active } = useProgress()
  const [visible, setVisible] = useState(true)
  const overlayRef = useRef(null)
  const spinnerContainerRef = useRef(null)
  const barRef = useRef(null)
  const barsRef = useRef([])

  const isMobile = useMobile()
  const BAR_COUNT = isMobile ? 3 : 12

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        scaleX: progress / 100,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }, [progress])
 
  useEffect(() => {
    if (!active && progress === 100) {
      const bars = barsRef.current.filter(Boolean)

      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      })

      tl.to(spinnerContainerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: 'power2.in',
      })

      tl.add(signalLoaderDone)

      tl.to(
        bars,
        {
          scaleY: 0,
          duration: 0.8,
          ease: 'power4.inOut',
          stagger: { each: 0.06, from: 'center' },
        },
        '<',
      )
    }
  }, [active, progress])

  if (!visible) return null

  const value = Math.round(progress)

  return (
    <div
      ref={overlayRef}
      role='status'
      aria-live='polite'
      aria-busy='true'
      aria-label='Loading experience'
      className='fixed inset-0 z-9999 flex h-dvh w-full items-center justify-center'
    >
      <div className='pointer-events-none absolute inset-0 flex' aria-hidden='true'>
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (barsRef.current[i] = el)}
            className='bg-background h-full flex-1'
            style={{ transformOrigin: i % 2 === 0 ? 'top' : 'bottom' }}
          />
        ))}
      </div>

      <div
        ref={spinnerContainerRef}
        className='relative z-10 mt-[1.5vw] h-2 max-md:w-[60vw] w-[20vw] overflow-hidden rounded-full bg-white/20'
        role='progressbar'
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-label='Loading progress'
      >
        <div
          ref={barRef}
          className='h-full w-full origin-left bg-white'
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
      <span className='sr-only'>{value}% loaded</span>
    </div>
  )
}
