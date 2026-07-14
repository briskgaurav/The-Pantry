'use client'

import { useEffect, useState } from 'react'

export default function Clock() {
  const [now, setNow] = useState(null)

  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const label = now
    ? now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : '--:--'

  return (
    <time
      dateTime={now ? now.toISOString() : undefined}
      aria-label={`Current time ${label}`}
      className='text12 font-semibold tracking-wide tabular-nums'
      suppressHydrationWarning
    >
      {label}
    </time>
  )
}
