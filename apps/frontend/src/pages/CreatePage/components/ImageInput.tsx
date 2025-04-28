import { UploadIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ImageInput = () => {
  return (
    <>
      <Label
        htmlFor="image"
        className="relative flex h-[574px] w-[375px] cursor-pointer items-center justify-center rounded-4xl border-2 border-dashed border-neutral-200 bg-neutral-200 p-4 text-lg"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <UploadIcon />
          <span>Choose a file</span>
        </div>
        <div className="absolute bottom-8 text-center text-xs text-gray-600">
          We recommend using high quality .jpg files less than 20 MB or .mp4
          files less than 200 MB.
        </div>
      </Label>
      <Input
        id="image"
        type="file"
        className="hidden"
      />
    </>
  );
};

export default ImageInput;
