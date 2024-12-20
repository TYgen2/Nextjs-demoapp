"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormError from "../form-message/form-error";
import FormSuccess from "../form-message/form-success";
import { useState } from "react";
import { login } from "@/actions/login";
import Link from "next/link";
import useFormState from "@/hooks/use-form";
import useTokenParams from "@/hooks/use-token-params";

const LoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const { callbackUrl } = useTokenParams();

  const {
    error,
    setError,
    success,
    setSuccess,
    isPending,
    startTransition,
    resetMessages,
  } = useFormState();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    resetMessages();

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
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
        })
        .catch((e) => {
          // Check if this is a redirect error (which is actually expected)
          if (e instanceof Error && e.message === "NEXT_REDIRECT") {
            // This is an expected redirect, do nothing
            return;
          }
          // For any other errors, show the error message
          setError("Something went wrong!");
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full select-none space-y-4"
      >
        {showTwoFactor && (
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Two Factor Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-12 w-full rounded text-white"
                  />
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
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 w-full rounded text-white"
                      type="email"
                    />
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
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 w-full rounded text-white"
                      type="password"
                    />
                  </FormControl>

                  <Button variant="link" size="sm" className="px-0 underline">
                    <Link
                      href="/auth/reset"
                      className="text-blue-400 hover:text-blue-500"
                    >
                      Forgot password?
                    </Link>
                  </Button>

                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button
          className="h-12 w-full rounded bg-black font-bold"
          type="submit"
          disabled={isPending}
        >
          {showTwoFactor ? "Submit Code" : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
