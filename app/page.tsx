import Demo from '@/components/impress/Demo'
import HomeBanner from '@/components/impress/HomeBanner'
import Partners from '@/components/impress/Partners'
import Revolution from '@/components/impress/Revolution'
import Seeit from '@/components/impress/Seeit'
import Working from '@/components/impress/Working'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';

function page() {
  return (
    <>
      <HomeBanner />
      <Revolution />
      <Working />
      <Seeit />
      <Partners/>
      <Demo />
      <a
        href="https://wa.me/9810325021" // Replace with your WhatsApp number
        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={30} />
      </a>
    </>
  )
}

export default page
