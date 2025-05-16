import { useImageStore } from "@/stores/imgStore";

import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

const FontColorPicker = () => {
  const { textOptions, setTextOptions } = useImageStore();

  return (
    <div className="flex w-full items-center justify-between">
      <Label className="text-lg font-bold">Font Color</Label>
      <Input
        type="color"
        onChange={(e) => {
          setTextOptions({ ...textOptions, color: e.target.value });
        }}
        className="w-20 text-lg font-semibold"
        value={textOptions.color}
      />
    </div>
  );
};

export default FontColorPicker;
