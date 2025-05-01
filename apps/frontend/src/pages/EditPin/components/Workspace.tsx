import { useImageStore } from "@/stores/imgStore";

import ImagePreview from "./ImagePreview";

const Workspace = () => {
  const { canvasOptions } = useImageStore();

  return (
    <div
      className="flex flex-3 items-center justify-center py-16"
      style={{
        backgroundColor: canvasOptions.backgroundColor,
      }}
    >
      <ImagePreview />
    </div>
  );
};

export default Workspace;
