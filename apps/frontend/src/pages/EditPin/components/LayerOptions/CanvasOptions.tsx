import BackgroundColorPicker from "./CanvasOptions/BackgroundColorPicker";
import OrientationsSelector from "./CanvasOptions/OrientationsSelector";
import SizeSelectors from "./CanvasOptions/SizeSelectors";

const CanvasOptions = () => {
  return (
    <div className="w-full">
      <div className="space-y-6">
        <OrientationsSelector />
        <SizeSelectors />
        <BackgroundColorPicker />
      </div>
    </div>
  );
};

export default CanvasOptions;
