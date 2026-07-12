'use client'

import { Canvas } from '@react-three/fiber'
import { Center, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import GradientBackground from './GradientBackground'
import Models from './Model'
import MouseTilt from '@/components/utils/MouseTilt'

export default function Experience({ active, view = null, open = false }) {
    return (
        <Canvas
            id='pantry-section'
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 6], fov: 35 }}
            gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
            className='h-full w-full'
        >
            <Suspense fallback={null}>
                <GradientBackground active={active} />
                <Environment preset='studio' environmentIntensity={1} resolution={256} background={false} />
                <MouseTilt intensity={12}>
                    <Center>
                        <Models active={active} view={view} open={open} />
                    </Center>
                </MouseTilt>
            </Suspense>
        </Canvas>
    )
}
