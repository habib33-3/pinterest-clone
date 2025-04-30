import { Navigate } from "react-router";

import { useImageStore } from "@/stores/imgStore";

import ImagePreview from "./components/ImagePreview";
import LayerOptions from "./components/LayerOptions";
import Layers from "./components/Layers";

const EditPin = () => {
  const { uploadedImage } = useImageStore();

  if (!uploadedImage) {
    return <Navigate to="/create" />;
  }

  return (
    <div className="mx-auto my-4 max-w-7xl px-2 pb-10">
      <div className="flex w-full gap-4">
        <Layers />
        <ImagePreview />
        <LayerOptions />
      </div>
    </div>
  );
};

export default EditPin;
