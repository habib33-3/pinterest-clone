import { useImageStore } from "@/stores/imgStore";

import ImagePreview from "./ImagePreview";

const Workspace = () => {
  const { canvasOptions } = useImageStore();

  return (
    <div
      className="mt-10 flex flex-3 items-center justify-center border-x border-neutral-300 py-16"
      style={{
        backgroundColor: canvasOptions.backgroundColor,
      }}
    >
      <ImagePreview />
    </div>
  );
};

export default Workspace;
