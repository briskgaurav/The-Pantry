'use client'

import { useEffect, useRef } from 'react'

const SPACING = 32
const DOT_RADIUS = 1
const INFLUENCE = 250
const PULL = 0.35
const STIFFNESS = 0.06
const DAMPING = 0.86

export default function Dots() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    let dots = []
    let width = 0
    let height = 0
    let rafId = 0
    const pointer = { x: -9999, y: -9999, active: false }

    const buildGrid = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = 1
      
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      
      const cols = Math.ceil(width / SPACING) + 1
      const rows = Math.ceil(height / SPACING) + 1
      const offsetX = (width - (cols - 1) * SPACING) / 2
      const offsetY = (height - (rows - 1) * SPACING) / 2
      
      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = offsetX + c * SPACING
          const hy = offsetY + r * SPACING
          dots.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0 })
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      dots.forEach(d => {
        let tx = d.hx
        let ty = d.hy
        let brightness = 0.28
        let radius = DOT_RADIUS
        
        if (pointer.active) {
          const dx = pointer.x - d.hx
          const dy = pointer.y - d.hy
          const dist = Math.hypot(dx, dy)
          
          if (dist < INFLUENCE) {
            const strength = Math.pow(1 - dist / INFLUENCE, 2) * PULL
            tx += dx * strength
            ty += dy * strength
          }
          
          const currDist = Math.hypot(pointer.x - d.x, pointer.y - d.y)
          if (currDist < INFLUENCE) {
            const t = 1 - currDist / INFLUENCE
            brightness += t * 0.55
            radius += t * 0.9
          }
        }
        
        d.vx += (tx - d.x) * STIFFNESS
        d.vy += (ty - d.y) * STIFFNESS
        d.vx *= DAMPING
        d.vy *= DAMPING
        d.x += d.vx
        d.y += d.vy
        
        ctx.beginPath()
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(190, 190, 190, ${brightness})`
        ctx.fill()
      })
      
      rafId = requestAnimationFrame(draw)
    }

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    
    const handlePointerLeave = () => {
      pointer.active = false
    }

    buildGrid()
    
    if (isReduced) {
      draw()
      cancelAnimationFrame(rafId)
    } else {
      rafId = requestAnimationFrame(draw)
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      window.addEventListener('pointerleave', handlePointerLeave)
    }

    const resizeObserver = new ResizeObserver(() => {
      buildGrid()
      if (isReduced) draw()
    })
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <section className='relative rounded-b-[2.5vw] max-md:rounded-b-[6vw] z-100 h-[110vh] w-full bg-background'>
      <canvas ref={canvasRef} className='absolute inset-0 h-full w-full' />
    </section>
  )
}
