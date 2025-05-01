import { useEffect } from "react";

import { Trash2Icon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useImageStore } from "@/stores/imgStore";

const ImagePreview = () => {
  const {
    uploadedImage,
    textBoxOptions,
    textOptions,
    setTextBoxOptions,
    setCanvasOptions,
  } = useImageStore();

  useEffect(() => {
    if (!uploadedImage) return;

    const objectUrl = URL.createObjectURL(uploadedImage);
    const img = new Image();
    img.src = objectUrl;

    img.onload = () => {
      setCanvasOptions((prev) => ({
        ...prev,
        size: {
          width: img.width,
          height: img.height,
        },
      }));
    };

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [uploadedImage, setCanvasOptions]);

  if (!uploadedImage) return <div>No image</div>;

  const handleDelete = () => {
    setTextBoxOptions({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      text: "",
    });
  };

  return (
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
              onClick={handleDelete}
            >
              <Trash2Icon className="size-5 text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
