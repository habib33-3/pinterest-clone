import type { Dispatch, SetStateAction } from "react";

import type { Board, Pin } from "@/types/index";

import { Skeleton } from "@/ui/skeleton";

import SelectBoardForm from "../form/SelectBoardForm";

type Props = {
  boards: Board[];
  isLoading: boolean;
  isError: boolean;
  setOpenSavePinModal: Dispatch<SetStateAction<boolean>>;
  pin: Pin;
};

const SelectBoard = ({
  boards,
  isLoading,
  isError,
  setOpenSavePinModal,
  pin,
}: Props) => {
  if (isLoading) {
    return (
      <div className="h-60">
        <Skeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-60 items-center justify-center text-destructive">
        Failed to load boards.
      </div>
    );
  }

  if (boards.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-muted-foreground">No boards found</p>
      </div>
    );
  }

  return (
    <div className="h-60 overflow-y-scroll">
      {boards.map((board) => (
        <SelectBoardForm
          key={board.id}
          board={board}
          pin={pin}
          setOpenSavePinModal={setOpenSavePinModal}
        />
      ))}
    </div>
  );
};

export default SelectBoard;
