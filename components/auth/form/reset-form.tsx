"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";
import useFormState from "@/hooks/use-form";
import useCooldown from "@/hooks/use-cooldown";
import { BeatLoader } from "react-spinners";

const ResetForm = () => {
  const {
    error,
    setError,
    success,
    setSuccess,
    isPending,
    startTransition,
    resetMessages,
  } = useFormState();

  const { isInCooldown, remainingTime, startCooldown } = useCooldown({
    duration: 60,
  });

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    resetMessages();

    startTransition(() => {
      reset(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) startCooldown();
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

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button
          className="h-12 w-full rounded bg-black font-bold"
          type="submit"
          disabled={isPending || isInCooldown}
        >
          {isPending ? (
            <BeatLoader size={8} color="white" />
          ) : isInCooldown ? (
            <span className="text-gray-400">
              (Resend after {remainingTime} seconds)
            </span>
          ) : (
            "Send password reset link"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetForm;
