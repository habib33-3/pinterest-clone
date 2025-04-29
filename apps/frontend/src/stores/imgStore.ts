import { create } from "zustand";

type ImageStore = {
  uploadedImage: File | null;
  setUploadedImage: (file: File | null) => void;
};

export const useImageStore = create<ImageStore>((set) => ({
  uploadedImage: null,
  setUploadedImage: (file) => {
    set({ uploadedImage: file });
  },
}));
