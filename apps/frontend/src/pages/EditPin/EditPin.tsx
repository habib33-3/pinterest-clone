import { Link, Navigate } from "react-router";

import { useImageStore } from "@/stores/imgStore";

import { Button } from "@/ui/button";

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
      <div className="flex w-full items-center justify-end">
        <Link to={"/create"}>
          <Button className="bg-red-700 text-white hover:bg-red-950 active:scale-95">
            Save
          </Button>
        </Link>
      </div>
      <div className="flex w-full gap-4">
        <Layers />
        <Workspace />
        <LayerOptions />
      </div>
    </div>
  );
};

export default EditPin;
