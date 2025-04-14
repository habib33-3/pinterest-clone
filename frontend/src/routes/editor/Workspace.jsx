import Image from "../../components/Image/Image";
import { useEditorStore } from "../../utils/editorStore";
import "./Editor.css";

const Workspace = ({ previewImg }) => {
  const { textOptions, setTextOptions } = useEditorStore();

  return (
    <div className="workspace">
      <div className="canvas">
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
