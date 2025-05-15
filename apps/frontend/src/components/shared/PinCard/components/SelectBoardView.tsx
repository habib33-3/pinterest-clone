import type { Dispatch, SetStateAction } from "react";

import type { Board, Pin } from "@/types/index";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Separator } from "@/ui/separator";

import SelectBoard from "./SelectBoard";

type Props = {
  pin: Pin;
  boards: Board[];
  status: string;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setShowNewBoardForm: Dispatch<SetStateAction<boolean>>;
  setOpenSavePinModal: Dispatch<SetStateAction<boolean>>;
};

const SelectBoardView = ({
  pin,
  boards,
  status,
  searchQuery,
  setSearchQuery,
  setShowNewBoardForm,
  setOpenSavePinModal,
}: Props) => (
  <>
    <Input
      placeholder="Search Board..."
      value={searchQuery}
      className="w-full"
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
    />

    <SelectBoard
      boards={boards}
      isLoading={status === "pending"}
      isError={status === "error"}
      pin={pin}
      setOpenSavePinModal={setOpenSavePinModal}
    />

    <Separator />

    <Button
      variant="ghost"
      className="w-full justify-start text-sm"
      onClick={() => {
        setShowNewBoardForm(true);
      }}
    >
      + Create New Board
    </Button>
  </>
);

export default SelectBoardView;
