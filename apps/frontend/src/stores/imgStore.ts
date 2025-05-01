import { create } from "zustand";

import type {
  CanvasOptions,
  Orientation,
  TextBoxOptions,
  TextOptions,
} from "../types";

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
};

export const useImageStore = create<ImageStore>((set) => ({
  uploadedImage: null,
  setUploadedImage: (file) => {
    set({ uploadedImage: file });
  },
  textOptions: {
    fontSize: 16,
    alignment: "center",
    color: "#000",
  },
  setTextOptions: (options) => {
    set({ textOptions: options });
  },
  canvasOptions: {
    orientation: "portrait",
    size: {
      width: 375,
      height: 667,
    },
    backgroundColor: "#ffffff",
  },
  setCanvasOptions: (options) => {
    set((state) => {
      const updatedOptions =
        typeof options === "function" ? options(state.canvasOptions) : options;

      const orientation: Orientation =
        updatedOptions.size.width > updatedOptions.size.height
          ? "landscape"
          : "portrait";

      return { canvasOptions: { ...updatedOptions, orientation } };
    });
  },

  textBoxOptions: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    text: "",
  },
  setTextBoxOptions: (options) => {
    set({ textBoxOptions: options });
  },
}));
