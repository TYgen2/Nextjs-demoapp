import AnimatedCard from "@/app/components/auth/animated-card"
import ResetForm from "@/app/components/auth/reset-form"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const ResetPage = () => {
    return (
        <div className="flex absolute items-center justify-center h-screen w-screen overflow-hidden">
            <AnimatedCard>
                {/* Header */}
                <CardHeader className="flex text-center pt-16 pb-8">
                    <CardTitle className="text-5xl text-white font-bold tracking-widest select-none cursor-default">PATHETIC</CardTitle>
                    <CardDescription className="select-none cursor-default">Forgot your password? Reset it now✨</CardDescription>
                </CardHeader>

                {/* Email input */}
                <CardContent className="flex flex-1 flex-col justify-center items-center w-full px-16 space-y-4">
                    <ResetForm />
                </CardContent>

                {/* Go back to login */}
                <CardFooter className="flex py-8 select-none">
                    <Link href="/auth/login" className="underline text-sm text-gray-400">
                        Back to login
                    </Link>
                </CardFooter>
            </AnimatedCard>
        </div>
    )
}

export default ResetPage