import { RectangleHorizontal, RectangleVertical } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useImageStore } from "@/stores/imgStore";

import { cn } from "@/lib/utils";

import { portraitSizes } from "@/constants/sizes";

const CanvasOptions = () => {
  const { canvasOptions, setCanvasOptions } = useImageStore();

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div>
          <h2 className="mb-3 text-lg font-bold">Orientation</h2>
          <div className="flex flex-wrap gap-3">
            <div
              onClick={() => {
                setCanvasOptions({ ...canvasOptions, orientation: "portrait" });
              }}
              title="Portrait"
              className={cn(
                "cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-300/50",
                canvasOptions.orientation === "portrait"
                  ? "bg-gray-300"
                  : "bg-gray-200"
              )}
            >
              <RectangleVertical className="size-5" />
            </div>
            <div
              onClick={() => {
                setCanvasOptions({
                  ...canvasOptions,
                  orientation: "landscape",
                });
              }}
              title="Landscape"
              className={cn(
                "cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-300/50",
                canvasOptions.orientation === "landscape"
                  ? "bg-gray-300"
                  : "bg-gray-200"
              )}
            >
              <RectangleHorizontal className="size-5" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold">Size</h2>
          <div className="flex flex-wrap gap-2">
            {portraitSizes.map((size) => (
              <div
                key={size.name}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-300/50",
                  canvasOptions.size.width === size.width &&
                    canvasOptions.size.height === size.height
                    ? "bg-gray-300"
                    : "bg-gray-200"
                )}
              >
                <p
                  className="text-sm font-bold"
                  onClick={() => {
                    setCanvasOptions({ ...canvasOptions, size });
                  }}
                >
                  {size.width}:{size.height}
                </p>
              </div>
            ))}
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
