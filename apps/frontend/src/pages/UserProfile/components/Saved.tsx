import { Link } from "react-router";

import BoardCard from "@/shared/BoardCard/BoardCard";

import type { Board } from "@/types/index";

import { Button } from "@/ui/button";

type Props = {
  boards: Board[];
};

const Saved = ({ boards }: Props) => {
  if (boards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-3 text-4xl font-extrabold text-gray-800 sm:text-5xl">
          No Boards Saved
        </h1>
        <p className="mb-2 text-xl text-gray-600 sm:text-2xl">
          Start saving your favorite pins into boards.
        </p>
        <p className="mb-6 text-base text-gray-500 sm:text-lg">
          Boards help you organize and revisit your favorite ideas.
        </p>
        <Link to="/">
          <Button className="text-lg">Explore</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="gird-cols-1 grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
      {boards.map((board) => (
        <BoardCard
          board={board}
          key={board.id}
        />
      ))}
    </div>
  );
};

export default Saved;
