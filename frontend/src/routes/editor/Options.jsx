import { useState } from "react";

import { HexAlphaColorPicker } from "react-colorful";

import { useEditorStore } from "../../utils/editorStore";

const portraitSizes = [
  {
    name: "1:2",
    width: 1,
    height: 2,
  },
  {
    name: "9:16",
    width: 9,
    height: 16,
  },
  {
    name: "2:3",
    width: 2,
    height: 3,
  },
  {
    name: "3:4",
    width: 3,
    height: 4,
  },
  {
    name: "4:5",
    width: 4,
    height: 5,
  },
  {
    name: "1:1",
    width: 1,
    height: 1,
  },
];

const landscapeSizes = [
  {
    name: "2:1",
    width: 2,
    height: 1,
  },
  {
    name: "16:9",
    width: 16,
    height: 9,
  },
  {
    name: "3:2",
    width: 3,
    height: 2,
  },
  {
    name: "4:3",
    width: 4,
    height: 3,
  },
  {
    name: "5:4",
    width: 5,
    height: 4,
  },
  {
    name: "1:1",
    width: 1,
    height: 1,
  },
];

const Options = ({ previewImg }) => {
  const {
    selectedLayer,
    setTextOptions,
    textOptions,
    setCanvasOptions,
    canvasOptions,
  } = useEditorStore();

  const [isColorPickerOpen, setIsColorOpen] = useState(false);

  const originalOrientation =
    previewImg.width < previewImg.height ? "portrait" : "landscape";

  const handleOrientationClick = (orientation) => {
    let newHeight;

    if (originalOrientation === orientation) {
      newHeight = (375 * previewImg.height) / previewImg.width;
    } else {
      newHeight = (375 * previewImg.width) / previewImg.height;
    }

    setCanvasOptions({
      ...canvasOptions,
      orientation,
      size: "original",
      height: newHeight,
    });
  };

  const handleSizeClick = (size) => {
    let newHeight;

    if (size === "original") {
      if (originalOrientation === canvasOptions.orientation) {
        newHeight = (375 * previewImg.height) / previewImg.width;
      } else {
        newHeight = (375 * previewImg.width) / previewImg.height;
      }
    } else {
      newHeight = (375 * size.height) / size.width;
    }

    setCanvasOptions({
      ...canvasOptions,
      size: size === "original" ? "original" : size.name,
      height: newHeight,
    });
  };

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
        <div className="">
          <div className="editingOption">
            <span>Orientation</span>
            <div className="orientations">
              <div
                onClick={() => handleOrientationClick("portrait")}
                className={`orientation ${canvasOptions.orientation === "portrait" ? "selected" : ""}`}
              >
                P
              </div>
              <div
                onClick={() => handleOrientationClick("landscape")}
                className={`orientation ${canvasOptions.orientation === "landscape" ? "selected" : ""}`}
              >
                L
              </div>
            </div>
          </div>
          <div className="editingOption">
            <span>Sizes</span>
            <div className="sizes">
              <div
                className={`size ${canvasOptions.size === "original" ? "selected" : ""}`}
                onClick={() => handleSizeClick({ name: "original" })}
              >
                Original
              </div>
              {canvasOptions.orientation === "portrait" ? (
                <>
                  {portraitSizes.map((size) => (
                    <div
                      className={`size ${canvasOptions.size === size.name ? "selected" : ""}`}
                      key={size.name}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size.name}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {landscapeSizes.map((size) => (
                    <div
                      className={`size ${canvasOptions.size === size.name ? "selected" : ""}`}
                      key={size.name}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size.name}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="editingOption">
            <div className="bgColor">
              <div
                className="colorPreview"
                style={{ backgroundColor: canvasOptions.backgroundColor }}
                onClick={() => setIsColorOpen(!isColorPickerOpen)}
              >
                {isColorPickerOpen && (
                  <div className="colorPicker">
                    <HexAlphaColorPicker
                      color={canvasOptions.backgroundColor}
                      onChange={(color) =>
                        setCanvasOptions({
                          ...canvasOptions,
                          backgroundColor: color,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;
