import React from 'react'

const STRIP_COUNT = 20

const verticalMask = 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)'

function GlassPanel({ side }) {
    return (
        <div className='w-[35vw] h-full flex'>
            {Array.from({ length: STRIP_COUNT }).map((_, i) => {
                // Fade opacity toward the inner edge based on strip index
                const ratio = side === 'left'
                    ? 1 - i / (STRIP_COUNT - 1)   // left panel: last strip = inner edge
                    : i / (STRIP_COUNT - 1)        // right panel: first strip = inner edge
                const opacity = 0.3 + ratio * 0.7 // range from 0.3 (edge) to 1.0 (outer)

                return (
                    <div
                        key={i}
                        className='h-full border-r border-white/5 flex-1'
                        style={{
                            WebkitBackdropFilter: 'blur(10px)',
                            backdropFilter: 'blur(10px)',
                            opacity,
                            WebkitMaskImage: verticalMask,
                            maskImage: verticalMask,
                        }}
                    />
                )
            })}
        </div>
    )
}

export default function FractalGlass() {
    return (
        <div className='pointer-events-none h-full w-full absolute inset-0 flex items-center justify-between'>
            <GlassPanel side='left' />
            <GlassPanel side='right' />
        </div>
    )
}
