'use client'

import { useProgress } from '@react-three/drei'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

export default function Loader() {
    const { progress, active } = useProgress()
    const [visible, setVisible] = useState(true)
    const overlayRef = useRef(null)
    const counterRef = useRef(null)
    const barRef = useRef(null)

    // Animate the counter text to match progress
    useEffect(() => {
        if (counterRef.current) {
            counterRef.current.textContent = `${Math.round(progress)}%`
        }
        if (barRef.current) {
            gsap.to(barRef.current, {
                scaleX: progress / 100,
                duration: 0.4,
                ease: 'power2.out',
            })
        }
    }, [progress])

    // Fade out and remove once loading is complete
    useEffect(() => {
        if (!active && progress === 100) {
            const tl = gsap.timeline({
                onComplete: () => setVisible(false),
            })
            tl.to(counterRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: 'power2.in',
            })
            tl.to(barRef.current?.parentElement, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
            }, '<0.1')
            tl.to(overlayRef.current, {
                opacity:0,
                duration: 0.8,
                ease: 'power3.inOut',
            }, '+=0.2')
        }
    }, [active, progress])

    if (!visible) return null

    return (
        <div
            ref={overlayRef}
            className='fixed inset-0 z-[9999] flex flex-col items-center pb-[5vw] justify-end bg-black'
        >
         
            {/* Progress bar */}
            <div className='mt-[1.5vw] h-2 rounded-full w-[20vw] overflow-hidden bg-white/20'>
                <div
                    ref={barRef}
                    className='h-full w-full origin-left bg-white'
                    style={{ transform: 'scaleX(0)' }}
                />
            </div>
        </div>
    )
}
