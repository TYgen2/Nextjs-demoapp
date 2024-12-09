"use server";

import { signIn } from "@/auth"

export const googleLogin = async () => await signIn("google");
export const githubLogin = async () => await signIn("github");