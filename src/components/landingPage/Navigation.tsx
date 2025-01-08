import React from 'react'
import Link from 'next/link'
import AuthImg from '@public/Abstract Curves and Colors.jpeg'
import Logo from '@/components/logo'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Menu } from 'lucide-react'
import { redirect } from 'next/navigation'

const NavItems = () => {
    return <>
        <Link className='text-sm font-medium hover:underline underline-offset-4' href="#features">Features</Link>
        <Link className='text-sm font-medium hover:underline underline-offset-4' href="#pricing">Pricing</Link>
        <Link className='text-sm font-medium hover:underline underline-offset-4' href="#faqs">FAQs</Link>
    </>
}

const Navigation = () => {

    return (
        <nav className='bg-white shadow-lg h-20 flex justify-around items-center'>
            <Logo />

            <div className='hidden md:flex items-center justify-center gap-4'>
                <NavItems />
                <Link href='/login'> <Button>Sign up</Button></Link>
            </div>
            {/* mobile navigation */}
            <div className=' ml-auto md:hidden overflow-hidden'>
                <Sheet>
                    <SheetTrigger>
                        <Menu className='h-6 w-6' strokeWidth={1.5} />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetTitle className='sr-only'>
                            Navigation
                        </SheetTitle>
                        <nav className='mt-12 flex flex-col gap-4 items-start' >
                            <NavItems />
                            <Link href='/login'> <Button>Sign up</Button></Link>
                        </nav>
                    </SheetContent>
                </Sheet>

            </div>

        </nav>
    )
}

export default Navigation