'use client'

import { useEffect, useRef } from 'react'

const GAP = 32
const BASE_RADIUS = 1
const REACH = 250
const PULL = 0.35
const SPRING = 0.06
const FRICTION = 0.86

export default function DotsCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let dots = []
    let width = 0
    let height = 0
    let frameId = 0
    const mouse = { x: -9999, y: -9999, inside: false }

    function buildGrid() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height

      canvas.width = Math.floor(width)
      canvas.height = Math.floor(height)
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      const cols = Math.ceil(width / GAP) + 1
      const rows = Math.ceil(height / GAP) + 1
      const padX = (width - (cols - 1) * GAP) / 2
      const padY = (height - (rows - 1) * GAP) / 2

      dots = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const homeX = padX + col * GAP
          const homeY = padY + row * GAP
          dots.push({
            homeX,
            homeY,
            x: homeX,
            y: homeY,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      for (const dot of dots) {
        let targetX = dot.homeX
        let targetY = dot.homeY
        let alpha = 0.28
        let radius = BASE_RADIUS

        if (mouse.inside) {
          const toMouseX = mouse.x - dot.homeX
          const toMouseY = mouse.y - dot.homeY
          const homeDist = Math.hypot(toMouseX, toMouseY)

          if (homeDist < REACH) {
            const falloff = Math.pow(1 - homeDist / REACH, 2) * PULL
            targetX += toMouseX * falloff
            targetY += toMouseY * falloff
          }

          const liveDist = Math.hypot(mouse.x - dot.x, mouse.y - dot.y)
          if (liveDist < REACH) {
            const t = 1 - liveDist / REACH
            alpha += t * 0.55
            radius += t * 0.9
          }
        }

        dot.vx += (targetX - dot.x) * SPRING
        dot.vy += (targetY - dot.y) * SPRING
        dot.vx *= FRICTION
        dot.vy *= FRICTION
        dot.x += dot.vx
        dot.y += dot.vy

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(190, 190, 190, ${alpha})`
        ctx.fill()
      }

      frameId = requestAnimationFrame(draw)
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.inside = true
    }

    function onPointerLeave() {
      mouse.inside = false
    }

    buildGrid()

    if (prefersReducedMotion) {
      draw()
      cancelAnimationFrame(frameId)
    } else {
      frameId = requestAnimationFrame(draw)
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave)
    }

    const resizeObserver = new ResizeObserver(() => {
      buildGrid()
      if (prefersReducedMotion) draw()
    })
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 h-full w-full'
      aria-hidden='true'
    />
  )
}
