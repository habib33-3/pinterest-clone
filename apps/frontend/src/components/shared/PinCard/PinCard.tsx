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
  const { media, link, id } = pin;
  const [openSavePinModal, setOpenSavePinModal] = useState(false);
  const { board, status } = useGetSavedBoard(id);

  return (
    <div className="group mb-6 w-full cursor-pointer rounded-2xl transition-shadow hover:shadow-lg">
      <Card className="relative overflow-hidden rounded-2xl">
        {/* Top Left Floating Board Info */}
        <div className="absolute top-4 left-1/2 z-10 -translate-x-1/2 space-y-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
          {status === "pending" && <Skeleton className="h-5 w-32" />}
          {status === "error" && (
            <p className="text-sm text-destructive">Failed to load board</p>
          )}
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

        {/* Image with maintained aspect ratio */}
        <Link to={`/pin/${id}`}>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-t-2xl bg-muted">
            <img
              src={media}
              alt={pin.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Bottom Buttons */}
        <div className="absolute right-4 bottom-4 left-4 flex justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="flex items-center gap-2 border border-border bg-white/70 shadow backdrop-blur-sm hover:scale-105"
                variant="secondary"
              >
                <MoveUpRight className="h-4 w-4" />
                <span className="text-sm font-medium">Visit Website</span>
              </Button>
            </a>
          ) : null}

          <ShareMoreButtons className="ml-auto" />
        </div>
      </Card>
    </div>
  );
};

export default PinCard;
