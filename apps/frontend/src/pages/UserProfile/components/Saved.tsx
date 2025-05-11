import BoardCard from "@/shared/BoardCard/BoardCard";

import type { Board } from "@/types/index";

type Props = {
  boards: Board[];
};

const Saved = ({ boards }: Props) => {
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
