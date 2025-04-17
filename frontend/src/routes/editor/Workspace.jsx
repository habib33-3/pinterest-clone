import { useEffect, useRef } from "react";

import Image from "../../components/Image/Image";
import { useEditorStore } from "../../utils/editorStore";
import "./Editor.css";

const Workspace = ({ previewImg }) => {
  const {
    textOptions,
    setTextOptions,
    canvasOptions,
    setCanvasOptions,
    setSelectedLayer,
  } = useEditorStore();

  const itemRef = useRef(null);
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

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

  const handleMouseMove = (e) => {
    if (!dragging.current) return;

    setTextOptions({
      ...textOptions,
      left: e.clientX - offset.current.x,
      top: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = (e) => {
    dragging.current = false;
  };
  const handleMouseLeave = (e) => {
    dragging.current = false;
  };

  const handleMouseDown = (e) => {
    setSelectedLayer("text");

    dragging.current = true;

    offset.current = {
      x: e.clientX - textOptions.left,
      y: e.clientY - textOptions.top,
    };
  };

  return (
    <div className="workspace">
      <div
        className="canvas"
        style={{
          height: `${canvasOptions.height}px`,
          backgroundColor: canvasOptions.backgroundColor,
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
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
            onMouseDown={handleMouseDown}
            ref={itemRef}
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
