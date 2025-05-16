import { useState } from "react";

import { Link } from "react-router";

import { MoveUpRight } from "lucide-react";

import useGetSavedBoard from "@/hooks/board/useGetSavedBoard";

import SavePin from "@/shared/PinCard/components/SavePin";

import type { Pin } from "@/types/index";

import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";

import ShareMoreButtons from "@/buttons/ShareMoreButtons";

import SavedBoardName from "./components/SavedBoardName";

type Props = {
  pin: Pin;
};

const PinCard = ({ pin }: Props) => {
  const { media, link, id, width, height } = pin;

  const [openSavePinModal, setOpenSavePinModal] = useState(false);

  const { board, status } = useGetSavedBoard(id);

  return (
    <div className="group mb-4 w-full cursor-pointer break-inside-avoid rounded-2xl border-1">
      <Card className="relative overflow-hidden rounded-lg shadow group-hover:opacity-80">
        <div className="absolute top-4 left-1/3 z-10 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="">{status === "pending" && <Skeleton />}</div>

          <div className="">
            {status === "error" && (
              <p className="text-destructive">Failed to load boards.</p>
            )}
          </div>

          {board ? (
            <SavedBoardName
              board={board}
              pinId={id}
            />
          ) : (
            <SavePin
              pin={pin}
              openSavePinModal={openSavePinModal}
              setOpenSavePinModal={setOpenSavePinModal}
            />
          )}
        </div>
        <Link to={`/pin/${id}`}>
          <img
            src={media}
            style={{ width, height }}
            alt={pin.title}
            className="block h-auto w-full object-contain"
          />
        </Link>

        <div className="absolute bottom-4 left-6 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center justify-between px-2">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="flex items-center gap-2 border-2 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-secondary/80 hover:shadow-xl"
                  variant="secondary"
                >
                  <MoveUpRight className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <p className="text-sm font-semibold">Visit Website</p>
                </Button>
              </a>
            ) : null}
          </div>
        </div>

        <ShareMoreButtons className="absolute right-4 bottom-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Card>
    </div>
  );
};

export default PinCard;
