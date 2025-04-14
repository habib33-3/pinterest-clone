import Image from "../../components/Image/Image";
import { useEditorStore } from "../../utils/editorStore";

const Layer = () => {
  const { selectedLayer, setSelectedLayer } = useEditorStore();

  const handleSelectedLayer = (layer) => {
    setSelectedLayer(layer);
  };

  return (
    <div className="layers">
      <div className="layersTitle">
        <h3>Layers</h3>
        <p>Select a layer</p>
      </div>
      <div
        className={`layer ${selectedLayer === "text" ? "selected" : ""}`}
        onClick={() => handleSelectedLayer("text")}
      >
        <div className="layerImage">
          <Image
            path="/general/text.png"
            alt=""
            w={48}
            h={48}
          />
        </div>
        <span>Add Text</span>
      </div>
      <div
        className={`layer ${selectedLayer === "canvas" ? "selected" : ""}`}
        onClick={() => handleSelectedLayer("canvas")}
      >
        <div
          className="layerImage"
          style={{
            backgroundColor: "teal",
          }}
        ></div>
        <span>Canvas</span>
      </div>
    </div>
  );
};

export default Layer;
