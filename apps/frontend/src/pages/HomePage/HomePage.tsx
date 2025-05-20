import useGetAllPins from "@/hooks/pin/useGetAllPins";

import PinCard from "@/shared/PinCard/PinCard";

import { Skeleton } from "@/ui/skeleton";

import ErrorPage from "../ErrorPage/ErrorPage";

const HomePage = () => {
  const { pins, status } = useGetAllPins();

  if (status === "pending") return <Skeleton />;
  if (status === "error") return <ErrorPage />;

  if (pins.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-700">No pins found</h1>
        <p className="mb-2 text-2xl font-semibold text-gray-600">
          Try searching for something
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
        {pins.map((pin) => (
          <PinCard
            key={pin.id}
            pin={pin}
          />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center">
        <div className="rounded-lg border border-dashed border-gray-300 px-6 py-4 text-center text-lg text-gray-500 italic shadow-sm">
          🎉 You&apos;ve reached the end. No more pins to display!
        </div>
      </div>
    </div>
  );
};

export default HomePage;
