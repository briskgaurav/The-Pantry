import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { degToRad } from 'three/src/math/MathUtils'

export default function MouseTilt({ children, intensity = 8 }) {
    const groupRef = useRef()
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize mouse position to -1 to 1
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame((_, delta) => {
        if (!groupRef.current) return

        const targetX = -mouse.current.y * degToRad(intensity)
        const targetY = mouse.current.x * degToRad(intensity)

        // Smooth lerp towards target rotation
        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * delta * 3
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * delta * 3
    })

    return (
        <group ref={groupRef}>
            {children}
        </group>
    )
}
