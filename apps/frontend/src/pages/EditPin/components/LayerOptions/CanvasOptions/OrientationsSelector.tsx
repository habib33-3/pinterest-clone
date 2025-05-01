import { RectangleHorizontal, RectangleVertical } from "lucide-react";

import { useImageStore } from "@/stores/imgStore";

import { cn } from "@/lib/utils";

import type { Orientation } from "@/types/index";

import { Button } from "@/ui/button";

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

const OrientationsSelector = () => {
  const { canvasOptions, setCanvasOptions } = useImageStore();

  const handleOrientationChange = (orientation: Orientation) => {
    const { width, height } = canvasOptions.size;

    setCanvasOptions({
      ...canvasOptions,
      orientation,
      size: { width: height, height: width },
    });
  };
  return (
    <div>
      <h2 className="mb-3 text-lg font-bold">Orientation</h2>
      <div className="flex flex-wrap gap-3">
        {orientationOptions.map(({ value, icon, title }) => (
          <Button
            size="icon"
            variant="outline"
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
  );
};

export default OrientationsSelector;
