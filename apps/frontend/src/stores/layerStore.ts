import { create } from "zustand";

type LayerStore = {
  layer: "text" | "canvas";
  setLayer: (layer: "text" | "canvas") => void;
};

export const useLayerStore = create<LayerStore>((set) => ({
  layer: "text",
  setLayer: (layer) => {
    set({ layer });
  },
}));
