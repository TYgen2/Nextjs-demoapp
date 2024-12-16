"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewPasswordSchema } from "@/schemas";
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
import { newPassword } from "@/actions/new-password";
import useAuthForm from "@/hooks/use-auth-form";
import useTokenParams from "@/hooks/use-token-params";
import { BeatLoader } from "react-spinners";

const NewPasswordForm = () => {
  const { token } = useTokenParams();

  const {
    error,
    setError,
    success,
    setSuccess,
    isPending,
    startTransition,
    resetMessages,
  } = useAuthForm();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    resetMessages();

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full select-none space-y-4"
      >
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />

        {!success && <Button
          className="h-12 w-full rounded bg-black font-bold"
          type="submit"
          disabled={isPending}
        >
          {isPending ?
            <BeatLoader className="mr-2" size={8} color="white" /> :
            <span className="text-white">Reset password</span>}
        </Button>}
      </form>
    </Form>
  );
};

export default NewPasswordForm;
