import RegisterForm from "@/app/components/auth/register-form";
import SocialLogin from "@/app/components/auth/social-login";
import AnimatedCard from "@/app/components/auth/animated-card";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex absolute items-center justify-center h-screen w-screen overflow-hidden">
      <AnimatedCard>
        {/* Header */}
        <CardHeader className="flex text-center pt-16 pb-8">
          <CardTitle className="text-5xl text-white font-bold tracking-widest select-none cursor-default">PATHETIC</CardTitle>
          <CardDescription className="select-none cursor-default">Welcome✨Register now!</CardDescription>
        </CardHeader>

        {/* Register input */}
        <CardContent className="flex flex-1 flex-col justify-center items-center w-full px-16 space-y-4">
          <RegisterForm />
          <SocialLogin />
        </CardContent>

        {/* Go to login */}
        <CardFooter className="flex py-8 select-none">
          <Link href="/auth/login" className="underline text-sm text-gray-400">
            Already have an account? Login
          </Link>
        </CardFooter>
      </AnimatedCard>
    </div>
  )
};

export default RegisterPage;
