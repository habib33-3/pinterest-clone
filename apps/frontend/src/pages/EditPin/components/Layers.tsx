import type { JSX } from "react";

import { useLayerStore } from "@/stores/layerStore";

import { cn } from "@/lib/utils";

const Layers = () => {
  const { setLayer, layer } = useLayerStore();

  const options: {
    key: "text" | "canvas";
    label: string;
    icon: JSX.Element;
  }[] = [
    {
      key: "text",
      label: "Add Text",
      icon: (
        <div className="flex size-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md transition group-hover:bg-indigo-600">
          T
        </div>
      ),
    },
    {
      key: "canvas",
      label: "Canvas",
      icon: (
        <div className="size-10 rounded-lg border border-black bg-blue-600 shadow-md group-hover:border-indigo-600" />
      ),
    },
  ];

  return (
    <div className="mt-10 flex flex-1 flex-col justify-start gap-6 px-4">
      <h3 className="text-left text-2xl font-semibold text-gray-900">Layers</h3>
      <p className="text-sm text-gray-600">Choose what to add to your canvas</p>

      <div className="flex flex-col gap-4">
        {options.map(({ key, label, icon }) => (
          <div
            key={key}
            onClick={() => {
              setLayer(key);
            }}
            className={cn(
              "group flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-4 shadow-sm transition hover:bg-gray-50 hover:shadow-md",
              layer === key ? "bg-gray-200/70 shadow-md" : ""
            )}
          >
            {icon}
            <h4
              className={cn(
                "text-base font-medium transition-colors",
                layer === key
                  ? "text-gray-800"
                  : "text-gray-800/50 group-hover:text-indigo-700"
              )}
            >
              {label}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layers;
