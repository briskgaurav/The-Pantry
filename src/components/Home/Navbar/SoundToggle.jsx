'use client'

import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function SoundToggle() {
  const [playing, setPlaying] = useState(false)
  const containerRef = useRef(null)

  useGSAP(() => {
    const bars = gsap.utils.toArray('.sound-bar', containerRef.current)

    if (playing) {
      bars.forEach((bar) => {
        const animateBar = () => {
          gsap.to(bar, {
            height: Math.random() * 12 + 4,
            duration: Math.random() * 0.2 + 0.15,
            ease: 'sine.inOut',
            onComplete: animateBar,
          })
        }
        animateBar()
      })
    } else {
      gsap.killTweensOf(bars)
      gsap.to(bars, { height: 3, duration: 0.3, ease: 'power2.out' })
    }

    return () => gsap.killTweensOf(bars)
  }, [playing])

  return (
    <button
      ref={containerRef}
      type='button'
      onClick={() => setPlaying(!playing)}
      aria-label={playing ? 'Mute ambient sound' : 'Play ambient sound'}
      aria-pressed={playing}
      className='flex min-h-6 min-w-6 cursor-pointer items-center justify-center gap-[2px] p-1'
    >
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          aria-hidden='true'
          className='sound-bar block h-3 w-[2px] bg-current'
        />
      ))}
    </button>
  )
}
