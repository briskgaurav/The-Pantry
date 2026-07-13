'use client'

import DotsCanvas from './DotsCanvas'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const POSTER =
  'https://cdn.prod.website-files.com/67a325294e5fbb80fd507882%2F6808f80f65429a2712c1f50a_Foreground%20Video%20compressed-poster-00001.jpg'
const VIDEO_MP4 =
  'https://cdn.prod.website-files.com/6855382e0864164c8e6fffec/6855382e0864164c8e7000bd_Foreground%20Video%20compressed-transcode.mp4'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function buildBoxMask() {
  const d = [
    `M 30 0`,
    `H ${450 - 130}`,
    `A 30 30 0 0 1 ${450 - 130 + 30} 30`,
    `V ${60 - 30}`,
    `A 30 30 0 0 0 ${450 - 130 + 30 * 2} 60`,
    `H ${450 - 30}`,
    `A 30 30 0 0 1 450 ${60 + 30}`,
    `V ${700 - 30}`,
    `A 30 30 0 0 1 ${450 - 30} 700`,
    `H 130`,
    `A 30 30 0 0 1 ${130 - 30} ${700 - 30}`,
    `V ${700 - 60 + 30}`,
    `A 30 30 0 0 0 ${130 - 30 * 2} ${700 - 60}`,
    `H 30`,
    `A 30 30 0 0 1 0 ${700 - 60 - 30}`,
    `V 30`,
    `A 30 30 0 0 1 30 0`,
    'Z',
  ].join(' ')

  return `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 700" preserveAspectRatio="none"><path fill="white" d="${d}"/></svg>`
  )}")`
}

export default function Dots() {
  const BOX_MASK = buildBoxMask()

  const maskStyle = {
    WebkitMaskImage: BOX_MASK,
    maskImage: BOX_MASK,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  }

  useGSAP(() => {
    gsap.fromTo(
      '#parallax-div',
      { yPercent: 25 },
      {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: '#dots-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  })

  return (
    <section
      id='dots-section'
      className='relative h-[110vh] w-full overflow-hidden bg-background max-md:h-auto max-md:min-h-[160vw]'
    >
      <DotsCanvas />

      <div className='pointer-events-none absolute inset-0 flex items-center justify-between px-[2vw] max-md:relative max-md:inset-auto max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-[8vw] max-md:px-[5vw] max-md:py-[20vw]'>
        <div className='relative h-[40vw] w-[40vw] max-md:mx-auto max-md:h-[75vw] max-md:w-[85vw]'>
          <div id='home-bg-video' className='background-video absolute inset-0' style={maskStyle}>
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={POSTER}
              className='h-full w-full object-cover brightness-30'
            >
              <source src={VIDEO_MP4} type='video/mp4' />
            </video>
          </div>
        </div>

        <div
          id='parallax-div'
          className='relative flex h-[40vw] w-[50vw] flex-col justify-between pb-[4vw] pr-[5vw] will-change-transform max-md:h-auto max-md:pt-[20vw] max-md:w-full max-md:gap-[16vw] max-md:pb-0 max-md:pr-0'
        >
          <h2 className='text36 flex flex-col gap-[0.15em] pt-[4vw] leading-[1.1] font-semibold text-white max-md:gap-[0.2em] max-md:pt-0'>
            <span>
              Fresh <span className='text-[#C600F6]'>Everyday</span>
            </span>
            <span className='pl-[4vw] max-md:pl-[6vw]'>
              <span className='text-[#C600F6]'>Essentials </span> from Our
            </span>
            <span className='pl-[8vw] max-md:pl-[12vw]'>Neighborhood Pantry</span>
          </h2>

          <p className='text18 ml-auto w-[22vw] text-right leading-[1.5] text-white/85 max-md:ml-0 max-md:w-[90%] max-md:text-left'>
            Stocked with seasonal produce, bakery warm from the oven, and pantry
            staples you actually reach for — groceries with care, flavor, and a
            little local soul.
          </p>
        </div>
      </div>
    </section>
  )
}
