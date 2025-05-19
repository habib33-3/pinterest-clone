import useGetAllPins from "@/hooks/pin/useGetAllPins";

import PinCard from "@/shared/PinCard/PinCard";

import { Skeleton } from "@/ui/skeleton";

import ErrorPage from "../ErrorPage/ErrorPage";

const HomePage = () => {
  const { pins, status } = useGetAllPins();

  if (status === "pending") {
    return <Skeleton />;
  }

  if (status === "error") {
    return <ErrorPage />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
      {pins.map((pin) => (
        <PinCard
          pin={pin}
          key={pin.id}
        />
      ))}

      {pins.length > 0 && (
        <div className="col-span-full flex items-center justify-center py-8">
          <div className="rounded-lg border border-dashed border-gray-300 px-6 py-4 text-lg text-gray-500 italic shadow-sm">
            🎉 You&apos;ve reached the end. No more pins to display!
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
