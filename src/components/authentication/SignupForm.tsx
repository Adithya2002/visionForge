"use client"
import React, { useId, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { toast } from "sonner"
import { signup } from '@/app/actions/auth-actions'
import { redirect } from 'next/navigation'



const passwordValidationRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')

const formSchema = z.object({
    fullname: z.string().min(3,{
        message: "Minimum 3 characters required"
    }),
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string({
        required_error: "Password is required!"
    }).min(8, {
        message: "Password must be at least 8 characters long"
    }).regex(
        passwordValidationRegex,{
            message: "Password must contain at least one uppercase, one lowercase, one digit, one special character and should be 8 characters long"
        }
    ),
    confirmPassword: z.string({
        required_error: "Confirm Password is required!"
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"]
})

const SignupForm = () => {
    const [loading, setLoading] = useState(false);
    const toastId = useId();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>){
        toast.loading("Signing up...", {id: toastId})
        setLoading(true);
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const formData = new FormData()
        formData.append('fullName', values.fullname)
        formData.append('email', values.email)
        formData.append('password', values.password)
        const {success, error} = await signup(formData)
        if(!success){
            toast.error(String(error), {id:toastId})
            setLoading(false)
        }
        else{
            toast.success('Sign up successful. Please confirm your email address', {id:toastId})
            setLoading(false)
            redirect('/login')
        }
        console.log(values)
    }


    return (
        <div className={cn("grid gap-6")}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="abc@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Re-type your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <Button disabled={loading} className='w-full' type="submit">
                        {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                        Sign up
                        </Button>

                </form>
            </Form>
        </div>
    )
}

export default SignupForm