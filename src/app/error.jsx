'use client'

import DotsCanvas from '@/components/Home/DotsCanvas'

export default function Error({ reset }) {
  return (
    <main className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-6 text-center text-white'>
      <DotsCanvas />
      <div className='relative z-10 flex max-w-md flex-col items-center gap-4'>
        <h1 className='text-2xl font-semibold'>Something went wrong</h1>
        <p className='text-white/80'>
          We couldn&apos;t load this part of The Pantry. Please try again.
        </p>
        <button
          type='button'
          onClick={() => reset()}
          className='rounded-full bg-white px-5 py-2 text-sm font-medium text-black'
        >
          Try again
        </button>
      </div>
    </main>
  )
}
