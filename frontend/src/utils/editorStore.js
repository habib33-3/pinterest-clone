import { create } from "zustand";

export const useEditorStore = create((set) => ({
  selectedLayer: "canvas",
  setSelectedLayer: (layer) => set({ selectedLayer: layer }),
}));
