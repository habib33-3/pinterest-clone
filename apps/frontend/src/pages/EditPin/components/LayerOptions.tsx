import { useLayerStore } from "@/stores/layerStore";

import CanvasOptions from "./LayerOptions/CanvasOptions";
import TextOptions from "./LayerOptions/TextOptions";

const LayerOptions = () => {
  const { layer } = useLayerStore();

  return (
    <div className="mt-8 flex flex-1 flex-col justify-start">
      {layer === "text" && <TextOptions />}
      {layer === "canvas" && <CanvasOptions />}
    </div>
  );
};

export default LayerOptions;
