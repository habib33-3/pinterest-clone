import useGetAllPins from "@/hooks/pin/useGetAllPins";

import PinCard from "@/shared/PinCard/PinCard";

import { Skeleton } from "@/ui/skeleton";

const HomePage = () => {
  const { pins, status } = useGetAllPins();

  if (status === "pending") {
    return <Skeleton />;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="columns-1 gap-4 space-y-4 p-4 sm:columns-2 md:columns-3">
      {pins.map((pin) => (
        <PinCard
          pin={pin}
          key={pin.id}
        />
      ))}
    </div>
  );
};

export default HomePage;
