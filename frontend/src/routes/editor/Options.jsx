import { useState } from "react";

import { HexAlphaColorPicker } from "react-colorful";

import { useEditorStore } from "../../utils/editorStore";

const Options = () => {
  const { selectedLayer, setTextOptions, textOptions } = useEditorStore();

  const [isColorPickerOpen, setIsColorOpen] = useState(false);

  return (
    <div className="options">
      {selectedLayer === "text" ? (
        <div className="">
          <div className="editingOption">
            <span>Font Size</span>
            <input
              type="number"
              name=""
              id=""
              value={textOptions.fontSize}
              onChange={(e) =>
                setTextOptions({ ...textOptions, fontSize: e.target.value })
              }
            />
          </div>
          <div className="editingOption">
            <span>Color</span>
            <div className="textColor">
              <div
                className="colorPreview"
                style={{ backgroundColor: textOptions.color }}
                onClick={() => setIsColorOpen(!isColorPickerOpen)}
              >
                {isColorPickerOpen && (
                  <div className="colorPicker">
                    <HexAlphaColorPicker
                      color={textOptions.color}
                      onChange={(color) =>
                        setTextOptions({
                          ...textOptions,
                          color,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};

export default Options;
