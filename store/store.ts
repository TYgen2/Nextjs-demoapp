import { create } from "zustand";

type UploadStore = {
  file: File | undefined;
  setFile: (file: File | undefined) => void;
  previewUrl: string | undefined;
  setPreviewUrl: (url: string | undefined) => void;
};

export const useUploadStore = create<UploadStore>((set) => ({
  file: undefined,
  setFile: (file: File | undefined) => set({ file }),
  previewUrl: undefined,
  setPreviewUrl: (url: string | undefined) => set({ previewUrl: url }),
}));
