import { Trash2Icon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useImageStore } from "@/stores/imgStore";

const ImagePreview = () => {
  const { uploadedImage, textBoxOptions, textOptions, setTextBoxOptions } =
    useImageStore();

  if (!uploadedImage) return <div>No image</div>;

  return (
    <div className="flex flex-3 items-center justify-center bg-neutral-300 py-16">
      <div className="relative w-[375px] overflow-hidden rounded-4xl">
        <img
          src={URL.createObjectURL(uploadedImage)}
          alt="Uploaded preview"
          className="h-auto w-full object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative inline-block">
            <Input
              className="border-none bg-transparent pr-10 text-center outline-none focus:outline-none"
              value={textBoxOptions.text}
              onChange={(e) => {
                setTextBoxOptions({
                  ...textBoxOptions,
                  text: e.target.value,
                });
              }}
              style={{
                fontSize: `${String(textOptions.fontSize)}px`,
                textAlign: textOptions.alignment,
                color: textOptions.color,
              }}
            />
            {textBoxOptions.text && (
              <button
                type="button"
                className="absolute top-1/2 right-0 -translate-y-1/2 rounded p-1 hover:bg-neutral-100"
                onClick={() => {
                  setTextBoxOptions({ ...textBoxOptions, text: "" });
                }}
              >
                <Trash2Icon className="size-5 text-red-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
