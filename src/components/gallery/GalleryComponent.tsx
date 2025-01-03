"use client"
import React, { useState } from 'react'
import { Tables } from '../../../database.types'
import Image from 'next/image'
import ImageDialog from './ImageDialog'


type ImageProps = {
  url: string | undefined,
} & Tables<'generated_images'>

interface GalleryProps {
  images: ImageProps[]
}

const GalleryComponent = ({ images }: GalleryProps) => {

  const [selectedImage, setSelectedImage] = useState<ImageProps|null>(null)

  if (images.length === 0) {
    return <div className='flex items-center justify-center h-[50vh] text-muted-foreground'>
      No images found!
    </div>
  }
  return (
    <section className='container mx-auto py-8'>
      <div className='columns-4 gap-4 space-y-4'>
        {
          images.map((image) => {
            return <div className='relative overflow-hidden group cursor-pointer transition-transform' onClick={() => setSelectedImage(image)}>
              <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-70 rounded'>
                <div className='flex items-center justify-center h-full'>
                  <p className='text-primary-foreground text-lg font-semibold'>View details</p>

                </div>

              </div>
              <Image className='object-cover rounded' key={image.id} src={image.url!} height={image.height || 0} width={image.width || 0} alt={image.prompt || ""} />
            </div>

          })
        }
      </div>
      {
        selectedImage && <ImageDialog image={selectedImage} onClose={() => setSelectedImage(null)} />
      }
      
    </section>
  )
}

export default GalleryComponent