import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import Marquee from '../ui/marquee';
import { cn } from '@/lib/utils';
import img1 from "@public/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg"
import img2 from "@public/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg"
import img3 from "@public/hero-images/Confident Woman in Red Outfit.jpeg"
import img4 from "@public/hero-images/Confident Woman in Urban Setting.jpeg"
import img5 from "@public/hero-images/Futuristic Helmet Portrait.jpeg"
import img6 from "@public/hero-images/Futuristic Woman in Armor.jpeg"
import img7 from "@public/hero-images/Man in Brown Suit.jpeg"
import img8 from "@public/hero-images/Poised Elegance of a Young Professional.jpeg"
import img9 from "@public/hero-images/Professional Business Portrait.jpeg"
import img10 from "@public/hero-images/Professional Woman in Navy Blue Suit.jpeg"
import img11 from "@public/hero-images/Sophisticated Businessman Portrait.jpeg"
import Image from 'next/image';


const avatars = [
    {
        src: "/avatars/AutumnTechFocus.jpeg",
        fallback: "CN",
    },
    {
        src: "/avatars/Casual Creative Professional.jpeg",
        fallback: "AB",
    },
    {
        src: "/avatars/Golden Hour Contemplation.jpeg",
        fallback: "FG",
    },
    {
        src: "/avatars/Portrait of a Woman in Rust-Colored Top.jpeg",
        fallback: "PW",
    },
    {
        src: "/avatars/Radiant Comfort.jpeg",
        fallback: "RC",
    },
    {
        src: "/avatars/Relaxed Bearded Man with Tattoo at Cozy Cafe.jpeg",
        fallback: "RB",
    },
];

const Images = [
    {
      src: img1,
      alt: "AI generated image",
    },
    {
      src: img2,
      alt: "AI generated image",
    },
    {
      src: img3,
      alt: "AI generated image",
    },
    {
      src: img4,
      alt: "AI generated image",
    },
    {
      src: img5,
      alt: "AI generated image",
    },
    {
      src: img6,
      alt: "AI generated image",
    },
    {
      src: img7,
      alt: "AI generated image",
    },
    {
      src: img8,
      alt: "AI generated image",
    },
    {
      src: img9,
      alt: "AI generated image",
    },
    {
      src: img10,
      alt: "AI generated image",
    },
    {
      src: img11,
      alt: "AI generated image",
    },
  ];

const MarqueeColumn = ({
    reverse,duration,className
}:{
    reverse:boolean,
    duration:string,
    className?:string
}) => {

    return (
        
        <Marquee reverse={reverse} pauseOnHover vertical className={cn("duration-1000  w-full relative h-full flex flex-col justify-center items-center")}
        
        >
          {
            Images.sort(() => Math.random() - 0.5).map((image,index) => {
                return <Image  key={index} src={image.src} alt={image.alt} className='w-full h-full object-cover rounded opacity-[.25] hover:opacity-75 transition-opacity duration-300 ease-in-out ' />
            })
          }
        </Marquee>
 

    )

}


const HeroSection = () => {
    return (
        <section className='w-full relative min-h-screen flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-extrabold tracking-tighter'>
                    Transform your photos with the power of AI
                </h1>
                <p className='mt-4 text-center mx-auto max-w-3xl text-xl mb-8 text-gray-500'>
                    From LinkedIn headshots to Instagram influencer photos, Pictoria AI's state-of-the-art technology ensures you always look your best. Create, edit, and generate images effortlessly.
                </p>
            </div>
            <div className='flex items-center space-x-2 mb-4'>
                <div className='flex items-center -space-x-4'>
                    {
                        avatars.map((avatar, index) => {
                            return <Avatar key={index} className='inline-block border-2 border-background'>
                                <AvatarImage src={avatar.src} />
                                <AvatarFallback>{avatar.fallback}</AvatarFallback>
                            </Avatar>
                        })
                    }
                </div>
                <span className='text-gray-600 font-medium
                '>Loved by 1K+ customers</span>
            </div>
            <div className='absolute h-screen top-0 w-full grid grid-cols-6'>
                    <MarqueeColumn reverse={false} duration='20s'/>
                    <MarqueeColumn reverse={true} duration='20s'/>
                    <MarqueeColumn reverse={false} duration='20s'/>
                    <MarqueeColumn reverse={true} duration='20s'/>
                    <MarqueeColumn reverse={false} duration='20s'/>
                    <MarqueeColumn reverse={true} duration='20s'/>
            </div>
        </section>
    )
}

export default HeroSection