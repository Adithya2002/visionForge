import React from 'react'
import Configurations from '@/components/image-generation/Configurations'
import GeneratedImages from '@/components/image-generation/GeneratedImages'

const ImageGenerationPage = () => {
  return (
    <section className='mx-auto px-4 grid grid-cols-3 container overflow-hidden'>
      <div className=''>
        <Configurations />
      </div>
      <div className='p-4 col-span-2 rounded-xl flex items-center justify-center'>
        <GeneratedImages/>
      </div>
    </section>
  )
}

export default ImageGenerationPage