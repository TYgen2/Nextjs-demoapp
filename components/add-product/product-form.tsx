"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useFormState from "@/hooks/use-form";
import { ProductSchema } from "@/schemas";
import { ProductOrientation } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { computeSHA256 } from "@/utils/helper";
import { getSignedURL } from "@/actions/uploadS3";
import { useUploadStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { ProductReturnFromDB } from "@/types/product";

const ProductForm = () => {
  const {
    error,
    setError,
    success,
    setSuccess,
    isPending,
    startTransition,
    resetMessages,
  } = useFormState();
  const router = useRouter();

  const file = useUploadStore((state) => state.file);
  const setFile = useUploadStore((state) => state.setFile);
  const setPreviewUrl = useUploadStore((state) => state.setPreviewUrl);

  const createQueryString = (name: string, value: ProductReturnFromDB) => {
    const params = new URLSearchParams();
    params.set(name, JSON.stringify(value));

    return params.toString();
  };

  const handleUpload = async (values: z.infer<typeof ProductSchema>) => {
    try {
      if (file) {
        const checksum = await computeSHA256(file);
        const signedURLResult = await getSignedURL(
          file.type,
          file.size,
          checksum,
          values,
        );

        if (signedURLResult.failure !== undefined) {
          throw new Error(signedURLResult.failure);
        }

        const { url, productDetails } = signedURLResult.success;
        await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        setFile(undefined);
        setPreviewUrl(undefined);

        router.push(
          "/dashboard/add-product/success-submission" +
            "?" +
            createQueryString("productDetails", productDetails),
        );
      }
    } catch (error) {
      console.log("EROOOORRRR", error);
    }
  };

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      orientation: ProductOrientation.HORIZONTAL,
    },
  });

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    resetMessages();
    startTransition(() => {
      handleUpload(values)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => console.error(e));
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-bold">Name</FormLabel>
              <FormControl>
                <Input {...field} className="h-12 w-full rounded" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-bold">Description</FormLabel>
              <FormControl>
                <Input {...field} className="h-12 w-full rounded" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-bold">Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-12 w-full rounded"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="orientation"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-md font-bold">Orientation</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="HORIZONTAL" />
                    </FormControl>
                    <FormLabel className="font-normal">Horizontal</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="PORTRAIT" />
                    </FormControl>
                    <FormLabel className="font-normal">Portrait</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="h-12 w-full rounded bg-black font-bold"
          type="submit"
          disabled={isPending}
        >
          Publish
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
