import { useEffect } from "react";

import Image from "../../components/Image/Image";
import { useEditorStore } from "../../utils/editorStore";
import "./Editor.css";

const Workspace = ({ previewImg }) => {
  const { textOptions, setTextOptions, canvasOptions, setCanvasOptions } =
    useEditorStore();

  useEffect(() => {
    if (canvasOptions.height === 0) {
      const canvasHeight = (375 * previewImg.height) / previewImg.width;

      setCanvasOptions({
        ...canvasOptions,
        height: canvasHeight,
        orientation: canvasHeight > 375 ? "landscape" : "portrait",
      });
    }
  }, [canvasOptions, previewImg.height, previewImg.width, setCanvasOptions]);

  console.log(canvasOptions);

  return (
    <div className="workspace">
      <div
        className="canvas"
        style={{
          height: `${canvasOptions.height}px`,
          backgroundColor: canvasOptions.backgroundColor,
        }}
      >
        <img
          src={previewImg.url}
          alt=""
        />
        {textOptions.text && (
          <div
            className="text"
            style={{
              left: textOptions.left,
              top: textOptions.top,
              fontSize: `${textOptions.fontSize}px`,
            }}
          >
            <input
              type="text"
              value={textOptions.text}
              onChange={(e) =>
                setTextOptions({ ...textOptions, text: e.target.value })
              }
              style={{
                color: textOptions.color,
              }}
            />
            <button
              className="deleteTextButton"
              onClick={() => setTextOptions({ ...textOptions, text: "" })}
            >
              <Image
                path="/general/delete.svg"
                alt="Delete"
                w={24}
                h={24}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
