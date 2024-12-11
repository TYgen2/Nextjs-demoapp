"use client"

import { newVerification } from "@/actions/new-verification"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { CardContent } from "@mui/material"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import FormSuccess from "./form-success"
import FormError from "./form-error"

export const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing token!");
            return
        }

        newVerification(token).then((data) => {
            setSuccess(data.success);
            setError(data.error);
        }).catch(() => {
            setError("Something went wrong!");
        })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return <div className="flex absolute items-center justify-center h-screen w-screen overflow-hidden">
        <Card className={`flex flex-col items-center justify-center w-[600px] h-[400px] border-none bg-black/45 transition-all duration-300`}>
            <CardHeader className="flex text-center pt-16 pb-8">
                <h1 className="text-5xl text-white font-bold tracking-widest select-none cursor-default">PATHETIC</h1>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col justify-center items-center w-full px-16 space-y-4">
                <h2 className="text-3xl text-white font-bold tracking-widest select-none cursor-default">Verification</h2>
                <p className="text-white text-sm">Confirming your verification</p>
                {!success && !error && <BeatLoader />}
                <FormSuccess message={success} />
                <FormError message={error} />
            </CardContent>

            <CardFooter>
                <a href="/auth/login" className="underline text-sm text-gray-400">Return to login</a>
            </CardFooter>
        </Card>
    </div>
}