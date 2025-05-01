import { RectangleHorizontal, RectangleVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    const { width, height } = canvasOptions.size;

    setCanvasOptions({
      ...canvasOptions,
      orientation,
      size: { width: height, height: width },
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
        {/* Orientation Section */}
        <div>
          <h2 className="mb-3 text-lg font-bold">Orientation</h2>
          <div className="flex flex-wrap gap-3">
            {orientationOptions.map(({ value, icon, title }) => (
              <Button
                size={"icon"}
                variant={"outline"}
                key={value}
                title={title}
                onClick={() => {
                  handleOrientationChange(value as Orientation);
                }}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-300/50",
                  canvasOptions.orientation === value
                    ? "bg-gray-300 ring-2 ring-gray-500 ring-offset-2"
                    : "bg-gray-200"
                )}
              >
                {icon}
              </Button>
            ))}
          </div>
        </div>

        {/* Size Section */}
        <div>
          <h2 className="mb-3 text-lg font-bold">Size</h2>
          <div className="flex flex-wrap gap-2">
            {orientationSizes.map((size) => (
              <Button
                size={"icon"}
                variant={"outline"}
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
              size={"icon"}
              variant={"outline"}
              onClick={handleResetToOriginal}
              className={cn(
                "w-max cursor-pointer rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300/50",
                canvasOptions.orientation ===
                  canvasOptions.originalOrientation &&
                  canvasOptions.size.width ===
                    canvasOptions.originalSize.width &&
                  canvasOptions.size.height ===
                    canvasOptions.originalSize.height
                  ? "scale-105 transform border-2 border-blue-600 bg-blue-500 text-white shadow-lg"
                  : ""
              )}
            >
              <p className="text-sm font-bold">Original</p>
            </Button>
          </div>
        </div>

        {/* Background Color */}
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
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasOptions;
