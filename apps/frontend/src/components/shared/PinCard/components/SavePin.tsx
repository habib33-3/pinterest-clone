import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import useGetAllBoards from "@/hooks/board/useGetAllBoards";
import useSavePinToNewBoard from "@/hooks/pin/useSavePinToNewBoard";
import useDebounce from "@/hooks/useDebounce";

import type { Pin } from "@/types/index";

import type { SavePinToNewBoardSchemaType } from "@/validations/pin";

import { DEBOUNCE_DELAY } from "@/constants/index";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

import CreateBoardFormView from "../form/CreateBoardFormView";
import SelectBoardView from "./SelectBoardView";

type Props = {
  pin: Pin;
  openSavePinModal: boolean;
  setOpenSavePinModal: Dispatch<SetStateAction<boolean>>;
};

const SavePin = ({ pin, openSavePinModal, setOpenSavePinModal }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewBoardForm, setShowNewBoardForm] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);
  const { boards, status } = useGetAllBoards(debouncedQuery);

  const { form, handleSavePinToNewForm, isPending } = useSavePinToNewBoard(
    pin.id
  );

  const onSubmit = (data: SavePinToNewBoardSchemaType) => {
    handleSavePinToNewForm(data);
    setShowNewBoardForm(false);
    setOpenSavePinModal(false);
  };

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
            <DialogTitle className="text-center">
              {showNewBoardForm ? "Create New Board" : "Select Board"}
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>

          {showNewBoardForm ? (
            <CreateBoardFormView
              pin={pin}
              form={form}
              isPending={isPending}
              onSubmit={onSubmit}
            />
          ) : (
            <SelectBoardView
              pin={pin}
              boards={boards}
              status={status}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setShowNewBoardForm={setShowNewBoardForm}
              setOpenSavePinModal={setOpenSavePinModal}
            />
          )}

          <div className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
              >
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavePin;
