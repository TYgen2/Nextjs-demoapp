"use client";

import ProductForm from "@/components/add-product/product-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const EditContentPage = () => {
  const searchParams = useSearchParams();
  const selectedFile = searchParams.get("selectedImage");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="flex h-[800px] w-[1600px] items-center justify-center rounded-2xl shadow-2xl"
    >
      {/*Selected image*/}
      <div className="relative h-[800px] w-[800px] flex-1 items-center justify-center">
        <Image
          src={selectedFile as string}
          alt="Selected Image"
          objectFit="contain"
          fill
        />
      </div>

      {/*Form field*/}
      <div className="h-full w-[600px] p-4">
        <Card className="flex h-full w-full flex-col items-center justify-center">
          <CardHeader className="h-32 w-full items-center justify-center bg-green-100 text-3xl font-bold">
            Product details
          </CardHeader>
          <CardContent className="flex w-full flex-1 items-start justify-center pt-12">
            <ProductForm />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default EditContentPage;
