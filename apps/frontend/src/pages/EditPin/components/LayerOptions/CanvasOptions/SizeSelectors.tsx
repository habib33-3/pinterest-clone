import { useImageStore } from "@/stores/imgStore";

import { cn } from "@/lib/utils";

import { landscapeSizes, portraitSizes } from "@/constants/sizes";

import { Button } from "@/ui/button";

const SizeSelectors = () => {
  const { canvasOptions, setCanvasOptions } = useImageStore();

  const orientationSizes =
    canvasOptions.orientation === "portrait" ? portraitSizes : landscapeSizes;

  const handleSizeChange = (size: { width: number; height: number }) => {
    const baseWidth = 375;
    const aspectRatio = size.width / size.height;

    const calculatedSize = {
      width: baseWidth,
      height: baseWidth / aspectRatio,
    };

    setCanvasOptions({ ...canvasOptions, size: calculatedSize });
  };

  const handleResetToOriginal = () => {
    setCanvasOptions({
      ...canvasOptions,
      orientation: canvasOptions.originalOrientation,
      size: canvasOptions.originalSize,
    });
  };

  return (
    <div>
      <h2 className="mb-3 text-lg font-bold">Size</h2>
      <div className="flex flex-wrap gap-2">
        {orientationSizes.map((size) => (
          <Button
            size="icon"
            variant="outline"
            key={size.name}
            onClick={() => {
              handleSizeChange(size);
            }}
            className={cn(
              "cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-300/50",
              canvasOptions.size.width / canvasOptions.size.height ===
                size.width / size.height
                ? "scale-105 transform border-2 border-blue-600 bg-blue-500 text-white shadow-lg"
                : "bg-gray-200"
            )}
          >
            <p className="text-sm font-bold">
              {size.width}:{size.height}
            </p>
          </Button>
        ))}
        <Button
          size="icon"
          variant="outline"
          onClick={handleResetToOriginal}
          className={cn(
            "w-max cursor-pointer rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300/50",
            canvasOptions.orientation === canvasOptions.originalOrientation &&
              canvasOptions.size.width === canvasOptions.originalSize.width &&
              canvasOptions.size.height === canvasOptions.originalSize.height
              ? "scale-105 transform border-2 border-blue-600 bg-blue-500 text-white shadow-lg"
              : ""
          )}
        >
          <p className="text-sm font-bold">Original</p>
        </Button>
      </div>
    </div>
  );
};

export default SizeSelectors;
