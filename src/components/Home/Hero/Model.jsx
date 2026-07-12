'use client'

import { useGSAP } from '@gsap/react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { degToRad } from 'three/src/math/MathUtils'
import { CATEGORIES, VIEWS } from './categories'

const FIT_SIZE = 2.8

function CategoryModel({ file, node, rotationX = 0, rotationY = 0, view = null }) {
  const { scene } = useGLTF(file)

  const object = useMemo(() => {
    const source = node ? scene.getObjectByName(node) : scene
    if (!source) return new THREE.Group()

    const model = skeletonClone(source)
    model.position.set(0, 0, 0)
    model.rotation.set(0, 0, 0)
    model.scale.setScalar(1)
    model.updateWorldMatrix(true, true)

    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const scale = FIT_SIZE / Math.max(size.x, size.y, size.z)

    model.position.sub(center) 

    const tilt = new THREE.Group()
    tilt.add(model)
    tilt.rotation.x = degToRad(-90)

    const wrapper = new THREE.Group()
    wrapper.add(tilt)
    wrapper.scale.setScalar(scale)
    return wrapper
  }, [scene, node])

  const ref = useRef()
  // Outer group used only for "view" orientations, so it never fights with the
  // idle wobble/spin that live on `ref`.
  const viewRef = useRef()
  const floatEnabled = useRef(true)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      gsap
        .timeline()
        .fromTo(
          el.scale,
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 1, z: 1, duration: .8, ease: 'back.out(1.6)' },
          0
        )
        .fromTo(
          el.rotation,
          { y: degToRad(-540) },
          { y: 0, duration: .7, ease: 'power3.out' },
          0
        )
    },
    { dependencies: [object] }
  )

  useFrame((state) => {
    if (ref.current && floatEnabled.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    }
  })

  // Idle loop when no view is selected; a held orientation when one is.
  // Rebuilds on view change so the idle timeline always starts from rest.
  useGSAP(
    () => {
      const el = ref.current
      const vel = viewRef.current
      if (!el || !vel) return

      if (view != null && VIEWS[view]) {
        const v = VIEWS[view]
        floatEnabled.current = false
        gsap.to(el.position, { y: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
        gsap.to(el.rotation, { x: 0, y: 0, z: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
        gsap.to(vel.rotation, {
          x: degToRad(v.rx),
          y: degToRad(v.ry),
          z: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          overwrite: 'auto',
        })
        return
      }

      floatEnabled.current = true
      gsap.to(vel.rotation, { x: 0, y: 0, z: 0, duration: 0.6, ease: 'power3.inOut', overwrite: 'auto' })

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 4, delay: 0.9 })
      tl.to(el.rotation, { z: degToRad(3), duration: 1, ease: 'sine.inOut' })
        .to(el.rotation, { z: degToRad(-3), duration: 1, ease: 'sine.inOut' })
        .to(el.rotation, { z: 0, duration: 0.1, ease: 'sine.inOut' })
        .to(el.rotation, {
          y: '+=' + Math.PI * 2,
          duration: 1.6,
          ease: 'back.out',
        })
      return () => tl.kill()
    },
    { dependencies: [object, view] }
  )

  return (
    <group ref={viewRef}>
      <group ref={ref}>
        <group rotation={[degToRad(rotationX), degToRad(rotationY), 0]}>
          <primitive object={object} />
        </group>
      </group>
    </group>
  )
}

export default function Models({ active, view = null }) {
  const category = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0]
  return (
    // Per-switch Suspense so loading a different file never unmounts the scene.
    <Suspense fallback={null}>
      <CategoryModel
        key={category.id}
        file={category.file}
        node={category.node}
        rotationX={category.rotationX}
        rotationY={category.rotationY}
        view={view}
      />
    </Suspense>
  )
}

// Warm the cache for every distinct file up front.
Array.from(new Set(CATEGORIES.map((c) => c.file))).forEach((file) =>
  useGLTF.preload(file)
)
