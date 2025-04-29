import { type ChangeEvent, useRef, useState } from "react";

import { RefreshCcw, UploadIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ImageInput = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {uploadedImage ? (
        <div
          className="relative flex h-[574px] w-[375px] cursor-pointer items-center justify-center rounded-4xl border-2 border-dashed border-neutral-200 bg-neutral-200 p-4 text-lg"
          onClick={triggerFileInput}
        >
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded"
            className="h-full w-full rounded-3xl object-cover"
          />
          <div className="absolute right-4 bottom-4 flex items-center gap-1 rounded-md bg-white px-3 py-1 text-sm shadow-md">
            <RefreshCcw className="size-4" />
            <span>Change</span>
          </div>
        </div>
      ) : (
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
      )}

      <Input
        id="image"
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};

export default ImageInput;
