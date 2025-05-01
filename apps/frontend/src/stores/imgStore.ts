import { create } from "zustand";

type TextAlignment = "left" | "center" | "right";
type Orientation = "portrait" | "landscape";

type TextOptions = {
  fontSize: number;
  alignment: TextAlignment;
  color: string;
};

type CanvasOptions = {
  orientation: Orientation;
  size: {
    width: number;
    height: number;
  };
  backgroundColor: string;
};

type TextBoxOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
};

type ImageStore = {
  uploadedImage: File | null;
  setUploadedImage: (file: File | null) => void;
  textOptions: TextOptions;
  setTextOptions: (options: TextOptions) => void;
  canvasOptions: CanvasOptions;
  setCanvasOptions: (options: CanvasOptions) => void;
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
    backgroundColor: "#fff",
  },
  setCanvasOptions: (options) => {
    set({ canvasOptions: options });
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
