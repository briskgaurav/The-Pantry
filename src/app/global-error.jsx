'use client'

import DotsCanvas from '@/components/Home/DotsCanvas'

export default function GlobalError({ reset }) {
  return (
    <html lang='en'>
      <head>
        <title>Something went wrong | The Pantry</title>
      </head>
      <body className='bg-black text-white'>
        <main className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center'>
          <DotsCanvas />
          <div className='relative z-10 flex max-w-md flex-col items-center gap-4'>
            <h1 className='text-2xl font-semibold'>Something went wrong</h1>
            <p className='text-white/80'>
              The Pantry hit an unexpected error. You can try loading the page
              again.
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
      </body>
    </html>
  )
}
