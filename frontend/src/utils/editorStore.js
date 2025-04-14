import { create } from "zustand";

export const useEditorStore = create((set) => ({
  selectedLayer: "canvas",

  setSelectedLayer: (layer) => set({ selectedLayer: layer }),

  textOptions: {
    text: "",
    fontSize: 48,
    color: "#000000",
    top: 0,
    left: 0,
  },

  setTextOptions: (options) => set({ textOptions: options }),

  addText: () =>
    set({
      textOptions: {
        text: "Add Text",
        fontSize: 48,
        color: "#000000",
        top: 0,
        left: 0,
      },
    }),

  canvasOptions: {
    height: 0,
    width: 0,
    orientation: "",
    size: "original",
    backgroundColor: "#000",
  },

  setCanvasOptions: (options) => set({ canvasOptions: options }),
}));
