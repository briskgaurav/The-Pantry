'use client'

import { useEffect, useState } from 'react'

export default function Clock() {
  const [time, setTime] = useState('--:--')

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <span className="text12 font-semibold tabular-nums tracking-wide" suppressHydrationWarning>
        {time}
      </span>
    </div>
  )
}
