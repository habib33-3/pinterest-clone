import { useImageStore } from "@/stores/imgStore";

import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

const FontSizeInput = () => {
  const { textOptions, setTextOptions } = useImageStore();

  return (
    <div className="flex w-full items-center justify-between">
      <Label className="text-lg font-bold">Font Size</Label>
      <Input
        onChange={(e) => {
          setTextOptions({ ...textOptions, fontSize: Number(e.target.value) });
        }}
        type="number"
        className="w-20 text-lg font-semibold"
        value={textOptions.fontSize}
      />
    </div>
  );
};

export default FontSizeInput;
