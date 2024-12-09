"use client";

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import FormError from './form-error';
import FormSuccess from './form-success';
import { useState, useTransition } from 'react';
import { login } from '@/actions/login';

const LoginForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values).then((data) => {
                setError(data.error);
                // setSuccess(data.success);
            })
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Email</FormLabel>
                            <FormControl>
                                <Input {...field} className='rounded w-full h-12 text-white' type='email' />
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
                            <FormLabel className='text-white'>Password</FormLabel>
                            <FormControl>
                                <Input {...field} className='rounded w-full h-12 text-white' type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormError message={error} />
                <FormSuccess message={success} />

                <Button className='rounded w-full h-12 font-bold bg-black' type='submit' disabled={isPending}>Login</Button>
            </form>
        </Form >
    )
}

export default LoginForm