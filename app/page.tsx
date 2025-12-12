import Demo from '@/components/impress/Demo'
import HomeBanner from '@/components/impress/HomeBanner'
import Partners from '@/components/impress/Partners'
import Revolution from '@/components/impress/Revolution'
import Seeit from '@/components/impress/Seeit'
import Working from '@/components/impress/Working'
import React from 'react'

function page() {
  return (
    <>
      <HomeBanner />
      <Revolution />
      <Working />
      <Seeit />
      <Partners/>
      <Demo />
    </>
  )
}

export default page
