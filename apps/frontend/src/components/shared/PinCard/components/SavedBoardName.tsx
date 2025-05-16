import { Trash2 } from "lucide-react";

import useRemovePinFromBoard from "@/hooks/board/useRemovePinFromBoard";

import type { Board } from "@/types/index";

import { Button } from "@/ui/button";

type Props = {
  board: Board;
  pinId: string;
};

const SavedBoardName = ({ board, pinId }: Props) => {
  const { handleRemovePinFromBoard, isPending } = useRemovePinFromBoard(
    pinId,
    board.id
  );

  return (
    <div className="my-1 flex w-full max-w-md items-center justify-between gap-4 rounded-2xl border bg-red-700 px-2 py-1 shadow-md transition-all duration-300 hover:shadow-lg">
      <h1 className="text-sm font-semibold text-gray-100">{board.title}</h1>

      <Button
        variant="outline"
        size="icon"
        onClick={handleRemovePinFromBoard}
        disabled={isPending}
        className="rounded-full shadow transition-transform duration-200 hover:scale-105 hover:shadow-md"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
};

export default SavedBoardName;
