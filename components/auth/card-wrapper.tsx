"use client";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AnimatedCard from "./animated-card";
import { BackButton } from "./_components/back-button";
import SocialLogin from "./_components/social-login";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="absolute flex h-screen w-screen items-center justify-center overflow-hidden">
      <AnimatedCard>
        {/* Header */}
        <CardHeader className="flex pb-8 pt-16 text-center">
          <CardTitle className="cursor-default select-none text-5xl font-bold tracking-widest text-white">
            PATHETIC
          </CardTitle>
          <CardDescription className="cursor-default select-none">
            {headerLabel}
          </CardDescription>
        </CardHeader>

        {/* Form input */}
        <CardContent className="flex w-full flex-1 flex-col items-center justify-center space-y-4 px-16">
          {children}
          {showSocial && <SocialLogin />}
        </CardContent>

        {/* Navigate to somewhere else */}
        <CardFooter className="flex select-none py-8">
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      </AnimatedCard>
    </div>
  );
};
