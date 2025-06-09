import { Link } from "react-router";

import PinCard from "@/shared/PinCard/PinCard";

import type { Pin } from "@/types/index";

import { Button } from "@/ui/button";

type Props = {
  pins: Pin[];
};

const Created = ({ pins }: Props) => {
  if (pins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-3 text-4xl font-extrabold text-gray-800 sm:text-5xl">
          No Pins Yet
        </h1>
        <p className="mb-2 text-xl text-gray-600 sm:text-2xl">
          Looks like you haven’t created any pins.
        </p>
        <p className="mb-6 text-base text-gray-500 sm:text-lg">
          Share your creativity with the world by adding your first pin.
        </p>
        <Link to="/create">
          <Button className="text-lg">Create Your First Pin</Button>
        </Link>
      </div>
    );
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

export default Created;
