"use client";

import { Button } from "@/components/ui/button";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import useTokenParams from "@/hooks/use-token-params";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const SocialLogin = () => {
  const { callbackUrl } = useTokenParams();
  const onClick = (provider: "google" | "github") => () => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <Button
        className="flex h-12 flex-1 bg-black font-bold"
        onClick={onClick("google")}
      >
        <GoogleIcon />
        <span className="bg-gradient-to-r from-blue-600 via-red-500 to-green-400 bg-clip-text text-transparent">
          Google
        </span>
      </Button>

      <Button
        className="flex h-12 flex-1 bg-black font-bold"
        onClick={onClick("github")}
      >
        <GitHubIcon />
        <span className="bg-gradient-to-r from-[#5eead4] via-[#93c5fd] to-[#a78bfa] bg-clip-text text-transparent">
          GitHub
        </span>
      </Button>
    </div>
  );
};

export default SocialLogin;
