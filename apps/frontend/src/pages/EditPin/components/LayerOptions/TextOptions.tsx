import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useImageStore } from "@/stores/imgStore";

import { cn } from "@/lib/utils";

const TextOptions = () => {
  const { textOptions, setTextOptions } = useImageStore();

  return (
    <div className="w-full">
      <h1 className="my-10 text-center text-xl font-bold">
        Customize your Text
      </h1>
      <div className="flex flex-col gap-8">
        <div className="flex w-full items-center justify-between">
          <Label className="text-lg font-bold">Font Size</Label>
          <Input
            onChange={(e) => {
              setTextOptions({
                ...textOptions,
                fontSize: Number(e.target.value),
              });
            }}
            type="number"
            className="w-20 text-lg font-semibold"
            defaultValue={textOptions.fontSize}
            value={textOptions.fontSize}
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <Label className="text-lg font-bold">Alignment</Label>
          <div className="flex gap-2">
            <div
              className={cn(
                "cursor-pointer rounded-lg bg-accent p-2",
                textOptions.alignment === "left" ? "bg-gray-300" : ""
              )}
              onClick={() => {
                setTextOptions({ ...textOptions, alignment: "left" });
              }}
            >
              <AlignLeft className="size-5" />
            </div>
            <div
              className={cn(
                "cursor-pointer rounded-lg bg-accent p-2",
                textOptions.alignment === "center" ? "bg-gray-300" : ""
              )}
              onClick={() => {
                setTextOptions({ ...textOptions, alignment: "center" });
              }}
            >
              <AlignCenter className="size-5" />
            </div>
            <div
              className={cn(
                "cursor-pointer rounded-lg bg-accent p-2",
                textOptions.alignment === "right" ? "bg-gray-300" : ""
              )}
              onClick={() => {
                setTextOptions({ ...textOptions, alignment: "right" });
              }}
            >
              <AlignRight className="size-5" />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <Label className="text-lg font-bold">Font Color</Label>
          <Input
            type="color"
            onChange={(e) => {
              setTextOptions({
                ...textOptions,
                color: e.target.value,
              });
            }}
            className="w-20 text-lg font-semibold"
            defaultValue={textOptions.color}
            value={textOptions.color}
          />
        </div>
      </div>
    </div>
  );
};

export default TextOptions;
