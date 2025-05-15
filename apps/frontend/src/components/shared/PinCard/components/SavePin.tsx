import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import useGetAllBoards from "@/hooks/board/useGetAllBoards";
import useDebounce from "@/hooks/useDebounce";

import type { Pin } from "@/types/index";

import { DEBOUNCE_DELAY } from "@/constants/index";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { Separator } from "@/ui/separator";
import { Skeleton } from "@/ui/skeleton";

import NewBoardForm from "../form/NewBoardForm";
import SelectBoardForm from "../form/SelectBoardForm";

type Props = {
  pin: Pin;
  openSavePinModal: boolean;
  setOpenSavePinModal: Dispatch<SetStateAction<boolean>>;
};

const SavePin = ({ pin, openSavePinModal, setOpenSavePinModal }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);

  const { boards, status } = useGetAllBoards(debouncedQuery);

  const [openNewBoardForm, setOpenNewBoardForm] = useState(false);

  if (status === "pending") return <Skeleton />;

  if (status === "error") return <div>Error</div>;

  return (
    <div className="mx-auto w-full">
      <Dialog
        open={openSavePinModal}
        onOpenChange={setOpenSavePinModal}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-red-700 text-gray-100"
          >
            Save Pin
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Select Board</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="">
            <Input
              placeholder="Search Board...."
              className="w-full"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>

          <div className="h-60 overflow-y-scroll">
            {boards.map((board) => (
              <SelectBoardForm
                setOpenSavePinModal={setOpenSavePinModal}
                key={board.id}
                board={board}
                pin={pin}
              />
            ))}
          </div>
          <Separator />
          <NewBoardForm
            pin={pin}
            setOpenSavePinModal={setOpenSavePinModal}
            openNewBoardForm={openNewBoardForm}
            setOpenNewBoardForm={setOpenNewBoardForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavePin;
