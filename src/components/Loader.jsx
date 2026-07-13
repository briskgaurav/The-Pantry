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

    // Animate the progress bar width
    useEffect(() => {
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
            tl.to(spinnerContainerRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: 'power2.in',
            })
            tl.to(overlayRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: 'power3.inOut',
            }, '+=0.1')
        }
    }, [active, progress])

    if (!visible) return null

    return (
        <div
            ref={overlayRef}
            className='fixed bg-background  inset-0 z-[9999] flex items-center justify-center h-dvh max-md:p-[1.5vw] w-full p-[.5vw]'
        >
            {/* <div className='bg-background text-background relative h-full w-full overflow-hidden rounded-[2.5vw] max-md:rounded-[5vw] flex items-center justify-center'> */}

                {/* Progress bar */}
                <div 
                    ref={spinnerContainerRef} 
                    className='mt-[1.5vw] h-2 rounded-full w-[20vw] overflow-hidden bg-white/20'
                >
                    <div
                        ref={barRef}
                        className='h-full w-full origin-left bg-white'
                        style={{ transform: 'scaleX(0)' }}
                    />
                {/* </div> */}
            </div>
        </div>
    )
}
