import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TextOptions = () => {
  return (
    <div className="w-full">
      <h1 className="my-10 text-center text-xl font-bold">
        Customize your Text
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <Label className="text-lg font-bold">Font Size</Label>
          <Input
            type="number"
            className="w-20 text-lg font-semibold"
            defaultValue={16}
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <Label className="text-lg font-bold">Alignment</Label>
          <div className="flex gap-2">
            <div className="rounded-lg bg-accent p-2">
              <AlignLeft className="size-5" />
            </div>
            <div className="rounded-lg bg-accent p-2">
              <AlignCenter className="size-5" />
            </div>
            <div className="rounded-lg bg-accent p-2">
              <AlignRight className="size-5" />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <Label className="text-lg font-bold">Font Color</Label>
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

export default TextOptions;
