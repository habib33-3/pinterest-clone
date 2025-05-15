import type { Dispatch, SetStateAction } from "react";

import { PlusIcon } from "lucide-react";

import useSavePinToNewBoard from "@/hooks/pin/useSavePinToNewBoard";

import { cn } from "@/lib/utils";

import type { Pin } from "@/types/index";

import type { SavePinToNewBoardSchemaType } from "@/validations/pin";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";

import SubmitButton from "@/buttons/SubmitButton";

type Props = {
  setOpenNewBoardForm: Dispatch<SetStateAction<boolean>>;
  openNewBoardForm: boolean;
  pin: Pin;
  setOpenSavePinModal: Dispatch<SetStateAction<boolean>>;
};

const NewBoardForm = ({
  pin,
  openNewBoardForm,
  setOpenNewBoardForm,
  setOpenSavePinModal,
}: Props) => {
  const { form, handleSavePinToNewForm, isPending } = useSavePinToNewBoard(
    pin.id
  );

  const onSubmit = (data: SavePinToNewBoardSchemaType) => {
    handleSavePinToNewForm(data);
    setOpenNewBoardForm(false);
    setOpenSavePinModal(false);
  };

  return (
    <Dialog
      onOpenChange={setOpenNewBoardForm}
      open={openNewBoardForm}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn("w-full justify-start text-sm")}
        >
          <PlusIcon className="mr-2 size-4" />
          Create New Board
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-auto w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Board</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Organize your saved pins by creating a new board.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src={pin.media}
              alt={pin.title}
              className="h-40 w-full rounded-md object-cover shadow"
            />
          </div>

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="boardTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Board Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Design Ideas"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isBoardPrivate"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mb-0">Private</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <SubmitButton
                  loading={isPending}
                  title="Save"
                />
              </form>
            </Form>
          </div>
        </div>

        <DialogFooter className="pt-4 sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewBoardForm;
