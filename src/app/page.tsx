import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navigation from '@/components/landingPage/Navigation'
import React from 'react'
import HeroSection from '@/components/landingPage/HeroSection'

export default async function Home() {

  const supabase = await createClient()
  const user = await supabase.auth.getUser()

  // if(user){
  //   return redirect("/dashboard")
  // }

  return (
    <main>
      <Navigation/>
      <HeroSection/>
      
    </main>
  )
}

