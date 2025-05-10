import { Link } from "react-router";

import type { Pin } from "@/types/index";

import InteractionsButtons from "./InteractionsButtons";

type Props = {
  pin: Pin;
};

const PinImage = ({ pin }: Props) => {
  const {
    media,
    title,
    description,
    user: { displayName, avatar, id: userId },
  } = pin;

  return (
    <div className="w-1/2 overflow-hidden rounded-xl bg-white">
      <div className="w-full bg-gray-100">
        <img
          src={media}
          className="h-full w-full object-cover object-center"
          alt={title}
        />
      </div>
      <div className="space-y-2 p-4">
        <InteractionsButtons />
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            className="size-10 rounded-full"
            alt=""
          />
          <Link to={`/profile/${userId}`}>
            <h5 className="ml-2 text-lg font-semibold hover:underline">
              {displayName}
            </h5>
          </Link>
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default PinImage;
