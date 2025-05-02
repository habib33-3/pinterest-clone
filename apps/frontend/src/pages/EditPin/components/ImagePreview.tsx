import type { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { useCallback, useRef, useState } from "react";

import { Trash2Icon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useImageStore } from "@/stores/imgStore";
import { useLayerStore } from "@/stores/layerStore";

import { cn } from "@/lib/utils";

const ImagePreview = () => {
  const {
    uploadedImage,
    textBoxOptions,
    textOptions,
    setTextBoxOptions,
    canvasOptions,
  } = useImageStore();

  const { layer, setLayer } = useLayerStore();

  const [isEditing, setIsEditing] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 50, y: 30 });

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      const offsetX =
        e.clientX - (containerRect?.left ?? 0) - textBoxOptions.left;
      const offsetY =
        e.clientY - (containerRect?.top ?? 0) - textBoxOptions.top;

      dragging.current = true;
      offset.current = {
        x: offsetX,
        y: offsetY,
      };
    },
    [textBoxOptions]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!dragging.current) return;

      const containerRect = containerRef.current?.getBoundingClientRect();
      const newLeft = e.clientX - offset.current.x - (containerRect?.left ?? 0);
      const newTop = e.clientY - offset.current.y - (containerRect?.top ?? 0);

      setTextBoxOptions({
        ...textBoxOptions,
        left: newLeft,
        top: newTop,
      });
    },
    [textBoxOptions, setTextBoxOptions]
  );

  const stopDragging = useCallback(() => {
    dragging.current = false;
  }, []);

  const handleDelete = useCallback(() => {
    setTextBoxOptions({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      text: "",
    });
    setIsEditing(true);
  }, [setTextBoxOptions]);

  const handleTextBoxInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTextBoxOptions({
      ...textBoxOptions,
      text: e.target.value,
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  if (!uploadedImage) return <div>No image</div>;

  return (
    <div
      className="relative w-[375px] overflow-hidden rounded-4xl"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <img
        src={URL.createObjectURL(uploadedImage)}
        alt="Uploaded preview"
        style={{
          width: `${String(canvasOptions.size.width)}px`,
          height: `${String(canvasOptions.size.height)}px`,
        }}
        className="h-auto w-full object-cover object-center"
      />

      {textBoxOptions.width > 0 && textBoxOptions.height > 0 && (
        <div
          className="absolute"
          onMouseDown={handleMouseDown}
          style={{
            left: `${String(textBoxOptions.left)}px`,
            top: `${String(textBoxOptions.top)}px`,
            width: `${String(textBoxOptions.width)}px`,
            height: `${String(textBoxOptions.height)}px`,
          }}
        >
          {isEditing ? (
            <Input
              autoFocus
              value={textBoxOptions.text}
              onChange={handleTextBoxInput}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                setLayer("text");
              }}
              className={cn(
                "border-none bg-transparent pr-10 text-center outline-none focus:outline-none",
                layer === "text" ? "bg-gray-200/70 shadow-md" : ""
              )}
              style={{
                fontSize: `${String(textOptions.fontSize)}px`,
                textAlign: textOptions.alignment,
                color: textOptions.color,
              }}
            />
          ) : (
            <div
              onDoubleClick={() => {
                setIsEditing(true);
              }}
              className="flex h-full w-full cursor-text items-center justify-center px-2 text-center"
              style={{
                fontSize: `${String(textOptions.fontSize)}px`,
                textAlign: textOptions.alignment,
                color: textOptions.color,
              }}
            >
              {textBoxOptions.text}
            </div>
          )}

          {textBoxOptions.text && isEditing && (
            <button
              type="button"
              aria-label="Delete Text"
              title="Delete"
              className={cn(
                "absolute top-1/2 right-0 -translate-y-1/2 rounded p-1 hover:bg-neutral-100 focus:outline-none",
                layer !== "text" && "hidden"
              )}
              onClick={handleDelete}
            >
              <Trash2Icon className="size-5 text-red-500" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
