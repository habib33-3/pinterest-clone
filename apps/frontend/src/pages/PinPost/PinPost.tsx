import useGetSInglePinById from "@/hooks/pin/useGetSInglePinById";

import { Skeleton } from "@/ui/skeleton";

import Comments from "./components/Comments";
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
      <div className="flex items-start justify-center gap-5">
        <PinImage pin={pin} />
        <Comments />
      </div>
    </div>
  );
};

export default PinPost;
