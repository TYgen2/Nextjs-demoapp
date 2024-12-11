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
import Link from 'next/link';

const LoginForm = () => {
    const [showTwoFactor, setShowTwoFactor] = useState(false);

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
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                }

                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                }

                if (data?.twoFactor) {
                    setShowTwoFactor(true);
                }
            }).catch(() => setError("Something went wrong!"));
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 select-none">
                {showTwoFactor && (
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-white'>Two Factor Code</FormLabel>
                                <FormControl>
                                    <Input {...field} className='rounded w-full h-12 text-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {!showTwoFactor && (
                    <>
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

                                    <Button variant="link" size="sm" className='px-0 underline'>
                                        <Link href="/auth/reset" className="text-blue-400 hover:text-blue-500">
                                            Forgot password?
                                        </Link>
                                    </Button>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>)}


                <FormError message={error} />
                <FormSuccess message={success} />

                <Button className='rounded w-full h-12 font-bold bg-black' type='submit' disabled={isPending}>
                    {showTwoFactor ? "Submit Code" : "Login"}
                </Button>
            </form>
        </Form >
    )
}

export default LoginForm