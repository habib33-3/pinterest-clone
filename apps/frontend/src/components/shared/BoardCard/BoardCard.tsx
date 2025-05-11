import { Link } from "react-router";

import { useUserStore } from "@/stores/userStore";

import type { Board } from "@/types/index";

import { Card, CardDescription, CardTitle } from "@/ui/card";

type Props = {
  board: Board;
};

const BoardCard = ({ board }: Props) => {
  const { user } = useUserStore();

  const isBoardHidden = board.isPrivate && board.userId !== user?.id;

  return (
    <Link to={`/board/${board.id}`}>
      <div
        hidden={isBoardHidden}
        className="mx-auto w-96 overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:shadow-2xl"
      >
        <Card className="relative h-60 overflow-hidden">
          <img
            src={board.thumbnail}
            alt={board.title}
            className="absolute h-full w-full object-cover"
          />

          <div className="absolute bottom-0 z-10 w-full bg-black/60 p-4">
            <CardTitle className="text-lg font-bold text-white drop-shadow-sm">
              {board.title}
            </CardTitle>
            <CardDescription className="text-sm text-white drop-shadow-sm">
              {board.description}
            </CardDescription>
          </div>
        </Card>
      </div>
    </Link>
  );
};

export default BoardCard;
