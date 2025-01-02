import { useUploadStore } from "@/store/store";
import { useCallback, useRef, useState } from "react";

export const useUpload = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageWidth, setImageWidth] = useState<number>(600);
  const [imageHeight, setImageHeight] = useState<number>(600);

  const file = useUploadStore((state) => state.file);
  const setFile = useUploadStore((state) => state.setFile);
  const previewUrl = useUploadStore((state) => state.previewUrl);
  const setPreviewUrl = useUploadStore((state) => state.setPreviewUrl);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      setFile(selectedFile);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (selectedFile) {
        const url = URL.createObjectURL(selectedFile);
        const img = new Image();
        img.src = url;
        img.onload = () => {
          setImageWidth(img.width);
          setImageHeight(img.height);
        };

        setPreviewUrl(url);
      } else {
        setPreviewUrl(undefined);
      }
    },
    [previewUrl, file],
  );

  return {
    inputRef,
    handleChange,
    imageWidth,
    imageHeight,
  };
};
