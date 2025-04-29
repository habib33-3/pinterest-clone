import { type ChangeEvent, useRef } from "react";

import { Pen, RefreshCcw, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useImageStore } from "@/stores/imgStore";

const ImageInput = () => {
  const { setUploadedImage, uploadedImage } = useImageStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  return (
    <>
      {uploadedImage ? (
        <div className="relative flex h-[574px] w-[375px] items-center justify-center rounded-4xl border-2 border-dashed border-neutral-200 bg-neutral-200 p-4 text-lg">
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded"
            className="h-full w-full rounded-3xl object-cover"
          />

          <Button
            variant="outline"
            className="absolute top-4 right-4 flex transform items-center gap-1 border border-red-700 bg-red-700 px-3 py-1 text-sm text-white shadow-sm transition duration-200 hover:scale-105 hover:bg-red-800 hover:text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
          >
            <Pen className="size-4 text-white" />
            <span>Edit</span>
          </Button>

          <Button
            onClick={() => fileInputRef.current?.click()}
            className="absolute right-4 bottom-4 flex transform items-center gap-2 rounded-md bg-blue-600 px-3 py-1 text-sm text-white shadow-md transition duration-200 hover:scale-105 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <RefreshCcw className="size-4 text-white" />
            <span>Change</span>
          </Button>
        </div>
      ) : (
        <Label
          htmlFor="image"
          className="relative flex h-[574px] w-[375px] cursor-pointer flex-col items-center justify-center gap-4 rounded-4xl border-2 border-dashed border-neutral-200 bg-neutral-200 p-4 text-lg transition hover:bg-neutral-300"
        >
          <Upload className="h-8 w-8 text-gray-500" />
          <span className="text-gray-700">Choose a file</span>
          <div className="absolute bottom-8 px-4 text-center text-xs text-gray-600">
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
