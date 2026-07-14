import Link from 'next/link'
import DotsCanvas from '@/components/Home/DotsCanvas'

export default function NotFound() {
  return (
    <main className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-6 text-center text-white'>
      <DotsCanvas />
      <div className='relative z-10 flex max-w-md flex-col items-center gap-4'>
        <h1 className='text-2xl font-semibold'>Page not found</h1>
        <p className='text-white/80'>
          That page doesn&apos;t exist in The Pantry.
        </p>
        <Link
          href='/'
          className='rounded-full bg-white px-5 py-2 text-sm font-medium text-black'
        >
          Back home
        </Link>
      </div>
    </main>
  )
}
