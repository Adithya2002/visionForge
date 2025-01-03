import React from 'react'
import { Tables } from '../../../database.types'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Download, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { deleteImage } from '@/app/actions/image-actions'

interface ImageDialogProps {
  image: { url: string | undefined } & Tables<"generated_images">,
  onClose: () => void

}

const ImageDialog = ({ image, onClose }: ImageDialogProps) => {

  const handleDownload = () => {
    fetch(image.url || '').then((response) => response.blob()).then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `generated-image-${Date.now()}.${image?.output_format}`
      )
      document.body.appendChild(link);
      link.click()

      //
      link.parentNode?.removeChild(link)
    }).catch(error => console.log(error))
  }


  return (

      <Sheet open={true} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Image Details</SheetTitle>
              <Image className='object-cover rounded mb-4' key={image.id} src={image.url!} height={image.height || 0} width={image.width || 0} alt={image.prompt || ""} />
              <div className='flex gap-4 justify-evenly '>
                <Button onClick={handleDownload}>
                  <Download className='w-4 h-4 mr-2'></Download> Download
                </Button>
                <Button className='bg-destructive' onClick={() => deleteImage(image.id, image.image_name||'')}>
                  <Trash className='w-4 h-4 mr-2'></Trash> Delete
                </Button>
              </div>
          </SheetHeader>
          <div className='flex gap-2 flex-col mt-4'>
            <span className='font-bold'>Prompt :</span> {image.prompt}
            <span className='font-bold'>Width :</span> {image.width}
            <span className='font-bold'>Height :</span> {image.height}

          </div>
        </SheetContent>
      </Sheet>


  )
}

export default ImageDialog