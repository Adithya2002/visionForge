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
import { toast } from "sonner"
import { cn } from '@/lib/utils'
import { login } from '@/app/actions/auth-actions'
import { redirect } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    })
})

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const toastId = useId();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast.loading('Logging in...', { id: toastId })
        setLoading(true)

        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const formData = new FormData()
        formData.append('email', values.email)
        formData.append('password', values.password)

        const { success, error } = await login(formData)
        if (!success) {
            toast.error("A problem occured while logging in! Check your email and password", { id: toastId })
            setLoading(false)
        } else {
            toast.success("Logged in successfully", { id: toastId })
            setLoading(false)
            redirect('/dashboard')
        }

        console.log(values)
    }


    return (
        <div className={cn("grid gap-6")}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Button disabled={loading} className='w-full' type="submit">
                        {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                        Login
                        </Button>

                </form>
            </Form>
        </div>
    )
}

export default LoginForm