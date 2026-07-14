'use client'

import { useProgress } from '@react-three/drei'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

export default function Loader() {
  const { progress, active } = useProgress()
  const [visible, setVisible] = useState(true)
  const overlayRef = useRef(null)
  const spinnerContainerRef = useRef(null)
  const barRef = useRef(null)

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
      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      })
      tl.to(spinnerContainerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: 'power2.in',
      })
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        '+=0.1',
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
      className='fixed inset-0 z-9999 flex h-dvh w-full items-center justify-center bg-background p-[.5vw] max-md:p-[1.5vw]'
    >
      <div
        ref={spinnerContainerRef}
        className='mt-[1.5vw] h-2 w-[20vw] overflow-hidden rounded-full bg-white/20'
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
