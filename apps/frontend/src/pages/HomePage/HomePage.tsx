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
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
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
