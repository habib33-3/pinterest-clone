import Layer from "./Layer";
import Options from "./Options";
import Workspace from "./Workspace";

const Editor = ({ previewImg }) => {
  return (
    <div className="editor">
      <Layer previewImg={previewImg} />
      <Workspace previewImg={previewImg} />
      <Options previewImg={previewImg} />
    </div>
  );
};

export default Editor;
