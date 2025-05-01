import { Navigate } from "react-router";

import { useImageStore } from "@/stores/imgStore";

import LayerOptions from "./components/LayerOptions";
import Layers from "./components/Layers";
import Workspace from "./components/Workspace";

const EditPin = () => {
  const { uploadedImage } = useImageStore();

  if (!uploadedImage) {
    return <Navigate to="/create" />;
  }

  return (
    <div className="mx-auto my-4 max-w-7xl px-2 pb-10">
      <div className="flex w-full gap-4">
        <Layers />
        <Workspace />
        <LayerOptions />
      </div>
    </div>
  );
};

export default EditPin;
