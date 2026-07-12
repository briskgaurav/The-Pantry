'use client'

import { Canvas } from '@react-three/fiber'
import { Center, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import GradientBackground from './GradientBackground'
import Models from './Model'
import MouseTilt from '@/components/utils/MouseTilt'

export default function Experience({ active, view = null }) {
    return (
        <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 6], fov: 35 }}
            className='h-full w-full'
        >
            <GradientBackground active={active} />
            <ambientLight intensity={0.9} />
            <Environment preset='studio' environmentIntensity={1} />
            <Suspense fallback={null}>
                <MouseTilt intensity={12}>
                    <Center>
                        <Models active={active} view={view} />
                    </Center>
                </MouseTilt>
            </Suspense>
        </Canvas>
    )
}
