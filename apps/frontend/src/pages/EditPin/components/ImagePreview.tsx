import { useImageStore } from "@/stores/imgStore";

const ImagePreview = () => {
  const { uploadedImage } = useImageStore();

  if (!uploadedImage) return <div>No image</div>;

  return (
    <div className="flex flex-3 items-center justify-center bg-neutral-300 py-16">
      <div className="relative flex w-[375px] items-center justify-center overflow-hidden rounded-4xl">
        <img
          src={URL.createObjectURL(uploadedImage)}
          alt=""
        />
      </div>
    </div>
  );
};

export default ImagePreview;
