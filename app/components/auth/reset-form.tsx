"use client";

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResetSchema } from '@/schemas';
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
import { reset } from '@/actions/reset';

const ResetForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            reset(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 select-none">
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

                <FormError message={error} />
                <FormSuccess message={success} />

                <Button className='rounded w-full h-12 font-bold bg-black' type='submit' disabled={isPending}>
                    Send reset email
                </Button>
            </form>
        </Form >
    )
}

export default ResetForm