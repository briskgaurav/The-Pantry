import Dots from '@/components/Home/Dots'
import Hero from '@/components/Home/Hero/Hero'
import Loader from '@/components/Loader'
import React from 'react'

export default function page() {
  return (
    <>
      <Loader />
      <Hero />
      <Dots />
    </>
  )
}
