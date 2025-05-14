import useGetAllBoards from "@/hooks/board/useGetAllBoards";

import type { Pin } from "@/types/index";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Separator } from "@/ui/separator";
import { Skeleton } from "@/ui/skeleton";

import NewBoardForm from "../form/NewBoardForm";
import SelectBoardForm from "../form/SelectBoardForm";

type Props = {
  pin: Pin;
};

const SavePin = ({ pin }: Props) => {
  const { boards, status } = useGetAllBoards();

  if (status === "pending") return <Skeleton />;

  if (status === "error") return <div>Error</div>;

  return (
    <div className="mx-auto w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Select Board</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="h-60 overflow-y-scroll">
            {boards.map((board) => (
              <SelectBoardForm
                key={board.id}
                board={board}
                pin={pin}
              />
            ))}
          </div>
          <Separator />
          <NewBoardForm pin={pin} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavePin;
