"use client"
import React from 'react'
import { Card, CardContent } from '../ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import useGeneratedStore from '@/store/useGeneratedStore'
import { LoaderIcon } from 'lucide-react'

// const images = [
//     {
//         src: '/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg',
//         alt: 'some text'
//     },
//     {
//         src: '/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg',
//         alt: 'some text'
//     },
//     {
//         src: '/hero-images/Confident Woman in Red Outfit.jpeg',
//         alt: 'some text'
//     },
//     {
//         src: '/hero-images/Futuristic Helmet Portrait.jpeg',
//         alt: 'some text'
//     },
// ]

const GeneratedImages = () => {

    const images = useGeneratedStore((state) => state.images)
    const loading = useGeneratedStore((state) => state.loading)


    if (images.length === 0) {
        return <Card className='bg-muted w-full max-w-2xl'>
            <CardContent className='flex aspect-square items-center justify-center p-6'>
                <span className='text-2xl'>No Images generated</span>
            </CardContent>
        </Card>
    }
    return (
        <Carousel className="w-full max-w-2xl">
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="flex relative items-center justify-center rounded-lg overflow-hidden aspect-square">
                            {
                                loading===true?<LoaderIcon className='animate-spin'  />:<Image src={image.url} alt='Generated images using ai' fill className='w-full h-full object-cover' />
                            }
                            
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default GeneratedImages