import { RectangleHorizontal, RectangleVertical } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { portraitSizes } from "@/constants/sizes";

const CanvasOptions = () => {
  return (
    <div className="w-full">
      <div className="space-y-6">
        <div>
          <h2 className="mb-3 text-lg font-bold">Orientation</h2>
          <div className="flex flex-wrap gap-3">
            <div
              title="Portrait"
              className="cursor-pointer rounded-lg bg-gray-300 px-3 py-2 hover:bg-gray-300/50"
            >
              <RectangleVertical className="size-5" />
            </div>
            <div
              title="Landscape"
              className="cursor-pointer rounded-lg bg-gray-300 px-3 py-2 hover:bg-gray-300/50"
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
                className="cursor-pointer rounded-lg bg-gray-300 px-3 py-2 hover:bg-gray-300/50"
              >
                <p className="text-sm font-bold">
                  {size.width}:{size.height}
                </p>
              </div>
            ))}
            <div className="cursor-pointer rounded-lg bg-gray-300 px-3 py-2 hover:bg-gray-300/50">
              1:1
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <Label className="text-lg font-bold">Background Color</Label>
          <Input
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
