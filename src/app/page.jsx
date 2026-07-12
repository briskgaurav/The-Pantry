import Dots from '@/components/Home/Dots'
import Footer from '@/components/Home/Footer/Footer'
import Hero from '@/components/Home/Hero/Hero'
import Navbar from '@/components/Home/Navbar/Navbar'
import Loader from '@/components/Loader'
import React from 'react'

export default function page() {
  return (
    <>
      <Loader />
      <Navbar />
      <Hero />
      <Dots />
      <Footer />
    </>
  )
}
