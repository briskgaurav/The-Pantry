import SiteShell from '@/components/Extras/SiteShell'
import Dots from '@/components/Home/Dots'
import Footer from '@/components/Home/Footer/Footer'
import Hero from '@/components/Home/Hero/Hero'
import Loader from '@/components/Loader'
import React from 'react'

export default function page() {
  return (
    <>
      <Loader />
      <SiteShell>
        <Hero />
        <Dots />
      </SiteShell>
      <Footer />
    </>
  )
}
