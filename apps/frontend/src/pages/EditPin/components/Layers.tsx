import { useImageStore } from "@/stores/imgStore";
import { useLayerStore } from "@/stores/layerStore";

import { cn } from "@/lib/utils";

const Layers = () => {
  const { setLayer, layer } = useLayerStore();
  const { canvasOptions, setTextBoxOptions } = useImageStore();

  const handleAddText = () => {
    setLayer("text");
    setTextBoxOptions({
      height: 30,
      left: 50,
      top: 50,
      width: 100,
      text: "",
    });
  };

  return (
    <div className="mt-10 flex flex-1 flex-col justify-start gap-6 px-4">
      <h3 className="text-left text-2xl font-semibold text-gray-900">Layers</h3>
      <p className="text-sm text-gray-600">Choose what to add to your canvas</p>

      <div className="flex flex-col gap-4">
        {/* Text Layer Option */}
        <div
          role="button"
          onClick={handleAddText}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleAddText();
            }
          }}
          className={cn(
            "group flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-4 shadow-sm transition hover:bg-gray-50 hover:shadow-md",
            layer === "text" ? "bg-gray-200/70 shadow-md" : ""
          )}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md transition group-hover:bg-indigo-600">
            T
          </div>
          <h4
            className={cn(
              "text-base font-medium transition-colors",
              layer === "text"
                ? "text-gray-800"
                : "text-gray-800/50 group-hover:text-indigo-700"
            )}
          >
            Add Text
          </h4>
        </div>

        {/* Canvas Layer Option */}
        <div
          role="button"
          onClick={() => {
            setLayer("canvas");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setLayer("canvas");
            }
          }}
          className={cn(
            "group flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-4 shadow-sm transition hover:bg-gray-50 hover:shadow-md",
            layer === "canvas" ? "bg-gray-200/70 shadow-md" : ""
          )}
        >
          <div
            style={{
              backgroundColor: canvasOptions.backgroundColor,
            }}
            className="size-10 rounded-lg border border-black shadow-md group-hover:border-indigo-600"
          />
          <h4
            className={cn(
              "text-base font-medium transition-colors",
              layer === "canvas"
                ? "text-gray-800"
                : "text-gray-800/50 group-hover:text-indigo-700"
            )}
          >
            Canvas
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Layers;
