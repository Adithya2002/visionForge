"use client"

import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ResetPasswordForm from './ResetPasswordForm'
import Link from 'next/link'

const AuthForm = () => {
    const [mode, setMode] = useState('login')
    return (
        <div className='space-y-6'>
            <div className='flex flex-col space-y-2 text-center'>
                <h1 className='text-2xl font-semibold tracking-tight'>
                    {
                        mode === "reset" ? "Reset Password" : mode === "login" ? "Login" : "Sign Up"
                    }
                </h1>
                <p className='text-sm text-muted-foreground'>
                    {
                        mode === "reset" ? "Enter your email to reset your password" : mode === "login" ? "Enter your email to login to your account" : "Enter your email and password to sign up"
                    }
                </p>
            </div>
            {
                mode === 'login' && <>
                    <LoginForm />
                    <div className='flex justify-between text-xs'>
                        <button onClick={() => setMode('signup')} className=' hover:underline'>Need an account? Sign up</button>
                        <button onClick={() => setMode('reset')} className=' hover:underline'>Forgot password?</button>
                    </div>
                </>
            }
            {
                mode === 'reset' && <>
                <ResetPasswordForm/>
                <div className='flex justify-center text-xs'>
                        <button onClick={() => setMode('login')} className=' hover:underline'>Back to login?</button>
                    </div>
                </>
            }
            {
                mode === 'signup' && <>
                    <SignupForm />
                    <div className='flex justify-center text-xs'>
                        <button onClick={() => setMode('login')} className=' hover:underline'>Already have an account? Log in</button>
                    </div>
                    
                    <p className='px-8 text-center text-xs text-muted-foreground'>
                        By clicking sign up, you agree to our <Link href="#" className="underline hover:text-black">Terms of service</Link> and <Link href="#" className="underline hover:text-black">Privacy Policy</Link>
                    </p>
                </>
            }
        </div>
    )
}

export default AuthForm