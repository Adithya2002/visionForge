import React from 'react'
import GalleryComponent from '@/components/gallery/GalleryComponent'
import { getImages } from '@/app/actions/image-actions'
const GalleryPage = async() => {
  const response = await getImages()
  const images = response?.data || null
  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>My images</h1>
      <p className='text-muted-foreground mb-6'>
        Here, you can see all the images you have generated.
      </p>
      <GalleryComponent images={images || []} />
    </div>
  )
}

export default GalleryPage