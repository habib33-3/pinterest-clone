import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

import { useImageStore } from "@/stores/imgStore";

import { cn } from "@/lib/utils";

import type { TextAlignment } from "@/types/index";

const alignments = [
  { value: "left", icon: <AlignLeft className="size-5" /> },
  { value: "center", icon: <AlignCenter className="size-5" /> },
  { value: "right", icon: <AlignRight className="size-5" /> },
];

const TextAlignmentSelector = () => {
  const { textOptions, setTextOptions } = useImageStore();

  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-lg font-bold">Alignment</p>
      <div className="flex gap-2">
        {alignments.map(({ value, icon }) => (
          <div
            key={value}
            className={cn(
              "cursor-pointer rounded-lg bg-accent p-2",
              textOptions.alignment === value ? "bg-gray-300" : ""
            )}
            onClick={() => {
              setTextOptions({
                ...textOptions,
                alignment: value as TextAlignment,
              });
            }}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextAlignmentSelector;
