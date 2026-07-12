'use client'

import { useGSAP } from '@gsap/react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { CATEGORIES } from '../../utils/categories'

// Fullscreen quad drawn in clip space (the vertex shader ignores the camera),
// so it always fills the canvas and sits behind the model. depthTest/Write are
// off and renderOrder is -1 so it never occludes anything drawn after it.
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  void main() {
    // Diagonal gradient animated by time
    float t = uTime * 0.2;
    float gradient = (vUv.x + vUv.y) * 0.5 + sin(t) * 0.15;
    float blend = smoothstep(0.2, 0.8, gradient);

    vec3 col = mix(uColorA, uColorB, blend);

    // Brief brightness pulse when the model switches.
    col += uPulse * 0.18 * (1.0 - blend);

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function GradientBackground({ active }) {
  const category = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0]

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPulse: { value: 0 },
      uColorA: { value: new THREE.Color(category.colors[0]) },
      uColorB: { value: new THREE.Color(category.colors[1]) },
    }),
    // Only ever built once; colors are animated via GSAP below.
    []
  )

  const start = useRef(true)

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
  })

  // Morph the gradient colors + fire a quick pulse whenever the model switches.
  useGSAP(
    () => {
      const [a, b] = category.colors.map((c) => new THREE.Color(c))

      // No animation on the very first render — just sit at the active colors.
      const duration = start.current ? 0 : 0.9
      start.current = false

      gsap.to(uniforms.uColorA.value, { r: a.r, g: a.g, b: a.b, duration, ease: 'power2.inOut' })
      gsap.to(uniforms.uColorB.value, { r: b.r, g: b.g, b: b.b, duration, ease: 'power2.inOut' })

      if (duration > 0) {
        gsap.fromTo(
          uniforms.uPulse,
          { value: 1 },
          { value: 0, duration: 1.1, ease: 'power2.out' }
        )
      }
    },
    { dependencies: [active] }
  )

  return (
    <mesh renderOrder={-1} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}
