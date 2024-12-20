"use client";

import ImageDropbox from "@/components/add-product/image-dropbox";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useUpload } from "@/hooks/use-upload";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUploadStore } from "@/store/store";

const AddProductPage = () => {
  const [confirm, setConfirm] = useState(false);
  const { inputRef, handleChange } = useUpload();

  const file = useUploadStore((state) => state.file);
  const previewUrl = useUploadStore((state) => state.previewUrl);
  const setFile = useUploadStore((state) => state.setFile);
  const setPreviewUrl = useUploadStore((state) => state.setPreviewUrl);

  useEffect(() => {
    setFile(undefined);
    setPreviewUrl(undefined);
  }, []);

  return (
    <motion.div className="flex flex-col gap-4">
      <ImageDropbox
        inputRef={inputRef}
        handleChange={handleChange}
        file={file}
        previewUrl={previewUrl}
      />

      {/* Image container */}
      {file && previewUrl && (
        <div className="relative h-[400px] max-w-[600px]">
          <Image
            src={previewUrl}
            alt="Selected Image"
            objectFit="contain"
            fill
          />
        </div>
      )}

      {/* Upload button */}
      {file && previewUrl && (
        <div className="flex flex-col gap-2">
          <Button
            className="h-20 rounded-3xl text-2xl font-bold"
            type="button"
            onClick={() => inputRef.current?.click()}
          >
            Select again
          </Button>

          <Button className="h-20 rounded-3xl text-2xl font-bold" type="button">
            <Link
              href={{
                pathname: "/dashboard/add-product/edit-content",
                query: { selectedImage: previewUrl },
              }}
            >
              Next step
            </Link>
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default AddProductPage;
