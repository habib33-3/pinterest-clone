import { LockIcon } from "lucide-react";

import useSavePin from "@/hooks/pin/useSavePin";

import type { Board, Pin } from "@/types/index";

import { Button } from "@/ui/button";

type Props = {
  pin: Pin;
  board: Board;
};

const SelectBoardForm = ({ board, pin }: Props) => {
  const { handleSavePin, isPending } = useSavePin({ pinId: pin.id });

  return (
    <div className="group relative flex w-full items-center justify-between gap-4 rounded-xl border bg-white p-3 shadow transition-all duration-200 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <img
            src={board.thumbnail}
            alt={`${board.title} thumbnail`}
            className="h-full w-full rounded-lg object-cover"
          />
          {board.isPrivate ? (
            <LockIcon className="absolute top-1 right-1 size-4 text-muted-foreground" />
          ) : null}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm leading-tight font-semibold text-foreground">
            {board.title}
          </p>
        </div>
      </div>
      <Button
        size="sm"
        disabled={isPending}
        onClick={() => {
          handleSavePin(board.id);
        }}
        className="bg-red-700 opacity-0 transition-opacity group-hover:opacity-100"
      >
        Save
      </Button>
    </div>
  );
};

export default SelectBoardForm;
