import PinCard from "@/shared/PinCard/PinCard";

import type { Pin } from "@/types/index";

type Props = {
  pins: Pin[];
};

const Created = ({ pins }: Props) => {
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
