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
    user: { displayName, avatar, userName },
  } = pin;

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md">
      <div className="max-h-96 w-full overflow-hidden bg-gray-100">
        <img
          src={media}
          className="h-auto max-h-96 w-full object-cover object-center"
          alt={title}
        />
      </div>
      <div className="space-y-3 p-4">
        <InteractionsButtons />
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            className="size-10 rounded-full"
            alt={`${displayName}'s avatar`}
          />
          <Link to={`/profile/${userName}`}>
            <h5 className="text-lg font-semibold hover:underline">
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
