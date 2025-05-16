import FontColorPicker from "./TextOptions/FontColorPicker";
import FontSizeInput from "./TextOptions/FontSizeInput";
import TextAlignmentSelector from "./TextOptions/TextAlignmentSelector";

const TextOptions = () => {
  return (
    <div className="w-full">
      <h1 className="my-10 text-center text-xl font-bold">
        Customize your Text
      </h1>
      <div className="flex flex-col gap-8">
        <FontSizeInput />
        <TextAlignmentSelector />
        <FontColorPicker />
      </div>
    </div>
  );
};

export default TextOptions;
