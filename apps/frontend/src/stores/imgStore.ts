import { create } from "zustand";

import type {
  CanvasOptions,
  TextBoxOptions,
  TextOptions,
} from "@/types/editingOptions";

const defaultTextOptions: TextOptions = {
  fontSize: 16,
  alignment: "center",
  color: "#000",
};

const defaultCanvasOptions: CanvasOptions = {
  orientation: "portrait",
  size: {
    width: 375,
    height: 667,
  },
  originalOrientation: "portrait",
  originalSize: {
    width: 375,
    height: 667,
  },
  backgroundColor: "#ffffff",
};

const defaultTextBoxOptions: TextBoxOptions = {
  left: 50,
  top: 50,
  width: 100,
  height: 30,
  text: "",
};

type ImageStore = {
  uploadedImage: File | null;
  setUploadedImage: (file: File | null) => void;
  textOptions: TextOptions;
  setTextOptions: (options: TextOptions) => void;
  canvasOptions: CanvasOptions;
  setCanvasOptions: (
    options: CanvasOptions | ((prev: CanvasOptions) => CanvasOptions)
  ) => void;
  textBoxOptions: TextBoxOptions;
  setTextBoxOptions: (options: TextBoxOptions) => void;
  reset: () => void;
};

export const useImageStore = create<ImageStore>((set) => ({
  uploadedImage: null,
  setUploadedImage: (file) => {
    set({ uploadedImage: file });
  },
  textOptions: defaultTextOptions,
  setTextOptions: (options) => {
    set({ textOptions: options });
  },
  canvasOptions: defaultCanvasOptions,
  setCanvasOptions: (options) => {
    set((state) => {
      const updatedOptions =
        typeof options === "function" ? options(state.canvasOptions) : options;
      return { canvasOptions: updatedOptions };
    });
  },
  textBoxOptions: defaultTextBoxOptions,
  setTextBoxOptions: (options) => {
    set({ textBoxOptions: options });
  },
  reset: () => {
    set({
      uploadedImage: null,
      textOptions: defaultTextOptions,
      canvasOptions: defaultCanvasOptions,
      textBoxOptions: defaultTextBoxOptions,
    });
  },
}));
