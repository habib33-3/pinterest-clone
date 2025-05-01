import { RectangleHorizontal, RectangleVertical } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useImageStore } from "@/stores/imgStore";

import { cn } from "@/lib/utils";

import type { Orientation } from "@/types/index";

import { landscapeSizes, portraitSizes } from "@/constants/sizes";

const CanvasOptions = () => {
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

  const handleOrientationChange = (orientation: Orientation) => {
    const currentSize = canvasOptions.size;

    const newSize = {
      width: currentSize.height,
      height: currentSize.width,
    };

    setCanvasOptions({
      ...canvasOptions,
      orientation,
      size: newSize,
    });
  };

  const handleResetToOriginal = () => {
    setCanvasOptions({
      ...canvasOptions,
      orientation: canvasOptions.originalOrientation,
      size: canvasOptions.originalSize,
    });
  };

  const orientationOptions = [
    {
      value: "portrait",
      icon: <RectangleVertical className="size-5" />,
      title: "Portrait",
    },
    {
      value: "landscape",
      icon: <RectangleHorizontal className="size-5" />,
      title: "Landscape",
    },
  ];

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div>
          <h2 className="mb-3 text-lg font-bold">Orientation</h2>
          <div className="flex flex-wrap gap-3">
            {orientationOptions.map(({ value, icon, title }) => (
              <div
                key={value}
                onClick={() => {
                  handleOrientationChange(value as Orientation);
                }}
                title={title}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-300/50",
                  canvasOptions.orientation === value
                    ? "bg-gray-300 ring-2 ring-gray-500 ring-offset-2"
                    : "bg-gray-200"
                )}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold">Size</h2>
          <div className="flex flex-wrap gap-2">
            {orientationSizes.map((size) => (
              <div
                key={size.name}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-300/50",
                  canvasOptions.size.width === size.width &&
                    canvasOptions.size.height === size.height
                    ? "scale-105 transform border-2 border-blue-600 bg-blue-500 text-white shadow-lg"
                    : "bg-gray-200"
                )}
              >
                <p
                  className="text-sm font-bold"
                  onClick={() => {
                    handleSizeChange(size);
                  }}
                >
                  {size.width}:{size.height}
                </p>
              </div>
            ))}
            <div
              className={cn(
                "cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-300/50"
              )}
            >
              <p
                className="text-sm font-bold"
                onClick={handleResetToOriginal}
              >
                Original
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <Label className="text-lg font-bold">Background Color</Label>
          <Input
            value={canvasOptions.backgroundColor}
            onChange={(e) => {
              setCanvasOptions({
                ...canvasOptions,
                backgroundColor: e.target.value,
              });
            }}
            type="color"
            className="w-20 text-lg font-semibold"
            defaultValue="#000000"
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasOptions;
