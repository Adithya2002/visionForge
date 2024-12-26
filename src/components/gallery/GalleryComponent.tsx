import React from 'react'
import { Tables } from '../../../database.types'

type ImageProps = {
    url:string | undefined,
} & Tables<'generated_images'>

interface GalleryProps {
    images:ImageProps[]
}
    
const GalleryComponent = ({images}:GalleryProps) => {
    console.log(images)
  return (
    <div>GalleryComponent</div>
  )
}

export default GalleryComponent