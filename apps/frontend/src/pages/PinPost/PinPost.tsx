import useGetSInglePinById from "@/hooks/pin/useGetSInglePinById";

import { Skeleton } from "@/ui/skeleton";

import PinImage from "./components/PinImage";

const PinPost = () => {
  const { pin, status } = useGetSInglePinById();

  if (status === "pending") {
    return <Skeleton />;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  if (!pin) {
    return <div>Pin not found</div>;
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl p-10">
      <div className="flex items-center justify-center">
        <PinImage pin={pin} />
      </div>
    </div>
  );
};

export default PinPost;
