'use client'
import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Logo from '../Navbar/Logo'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#footer',
                start: '10% bottom',
                end: '200% bottom',
                scrub: true,
                markers: false
            }
        })
        tl.fromTo('#footer', {
            yPercent: -100
        }, {
            yPercent: -5,
            ease: 'none',
        })
        tl.fromTo('#footer-logo', {
            opacity: 0,
            filter: 'blur(5px)'
        }, {
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none'
        }, "<1.4")
    })

    return (
        <footer id='footer' className='h-[20vw] max-md:h-[45vw]  mt-[-5vw] max-md:mt-[-10vw] flex items-center justify-center pt-[5vw] max-md:pt-[10vw] bg-foreground z-1 w-full'>
            <div id='footer-logo' className='size-[40vw] max-md:size-[75vw] text-background h-auto'>

               <Logo className={'h-full w-full object-contain'} />
            </div>

        </footer>
    )
}
