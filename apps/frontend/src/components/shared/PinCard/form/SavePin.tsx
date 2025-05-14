import { useState } from "react";

import { ChevronsUpDown } from "lucide-react";

import useGetAllBoards from "@/hooks/board/useGetAllBoards";
import useSavePin from "@/hooks/pin/useSavePin";

import { cn } from "@/lib/utils";

import type { Pin } from "@/types/index";

import { Button } from "@/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { Form, FormField, FormItem } from "@/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

import NewBoardForm from "./NewBoardForm";

type Props = {
  pin: Pin;
};

const SavePin = ({ pin }: Props) => {
  const [open, setOpen] = useState(false);

  const { boards, status } = useGetAllBoards();
  const { form, handleSavePin, isLoading } = useSavePin(pin.id);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error loading boards.</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          handleSavePin(data);
        })}
      >
        <div className="flex items-center justify-center gap-3">
          <FormField
            control={form.control}
            name="boardId"
            render={({ field }) => (
              <FormItem>
                <Popover
                  open={open}
                  onOpenChange={setOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {field.value
                        ? boards.find((board) => board.id === field.value)
                            ?.title
                        : "Select Board..."}
                      <ChevronsUpDown className="ml-2 size-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[200px] p-0"
                    side="bottom"
                    align="start"
                  >
                    <Command>
                      <CommandInput
                        placeholder="Search boards..."
                        className="h-9"
                      />
                      <CommandList className="max-h-60 overflow-y-auto">
                        <CommandEmpty>No Board found.</CommandEmpty>
                        <CommandGroup>
                          {boards.map((board) => (
                            <CommandItem
                              key={board.id}
                              value={board.id}
                              onSelect={(currentValue) => {
                                form.setValue("boardId", currentValue);
                                setOpen(false);
                              }}
                            >
                              <div
                                className={cn(
                                  "flex w-full items-center gap-2 rounded-r-2xl p-2",
                                  field.value === board.id && "bg-gray-300"
                                )}
                              >
                                <div className="rounded-xl p-1">
                                  <img
                                    className="size-8 object-contain object-center"
                                    src={board.thumbnail}
                                    alt={board.title}
                                  />
                                </div>
                                <h4 className="text-lg font-semibold">
                                  {board.title}
                                </h4>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                      <div className="border-t p-2">
                        <NewBoardForm
                          onOpenChange={setOpen}
                          pin={pin}
                        />
                      </div>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SavePin;
