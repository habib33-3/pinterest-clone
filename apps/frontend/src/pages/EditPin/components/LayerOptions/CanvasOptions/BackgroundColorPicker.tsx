import { useImageStore } from "@/stores/imgStore";

import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

const BackgroundColorPicker = () => {
  const { canvasOptions, setCanvasOptions } = useImageStore();

  return (
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
  );
};

export default BackgroundColorPicker;
