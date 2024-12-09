import LoginForm from "@/app/components/auth/login-form";
import SocialLogin from "@/app/components/auth/social-login";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex absolute items-center justify-center h-screen w-screen">
      <Card className="flex flex-col items-center justify-center w-[600px] border-none bg-black/45">

        {/* Header */}
        <CardHeader className="flex flex-1 w-full text-center justify-center items-center pt-16 pb-8">
          <CardTitle className="text-5xl text-white font-bold tracking-widest">PATHETIC</CardTitle>
          <CardDescription>Welcome✨Please login in</CardDescription>
        </CardHeader>

        {/* Login input */}
        <CardContent className="flex flex-1 flex-col justify-center items-center w-full px-16 space-y-4">
          <LoginForm />
          <SocialLogin />
        </CardContent>

        {/* Go to register */}
        <CardFooter className="flex flex-1 w-full text-white justify-center items-center py-8">
          <Link href="/auth/register" className="underline text-sm text-gray-400">
            Don't have an account? Register
          </Link>
        </CardFooter>

      </Card>
    </div>

  )
};

export default LoginPage;
