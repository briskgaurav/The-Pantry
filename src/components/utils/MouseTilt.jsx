import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { degToRad } from 'three/src/math/MathUtils'

export default function MouseTilt({ children, intensity = 8 }) {
    const groupRef = useRef()
    const mouse = useRef({ x: 0, y: 0 })
    // Event listener for mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])
    // Animation Frame for smooth tilt
    useFrame((_, delta) => {
        if (!groupRef.current) return

        const targetX = -mouse.current.y * degToRad(intensity)
        const targetY = mouse.current.x * degToRad(intensity)

        // Smooth lerp towards target rotation
        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * delta * 3
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * delta * 3
    })
// I added a group to rotate the parent wrapper so that it wont glitch
    return (
        <group ref={groupRef}>
            {children}
        </group>
    )
}
