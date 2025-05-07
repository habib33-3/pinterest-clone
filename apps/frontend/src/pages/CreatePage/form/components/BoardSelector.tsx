import { useFormContext } from "react-hook-form";

import type { CreatePinFormSchemaType } from "@/validations/pin";

import { Checkbox } from "@/ui/checkbox";
import { FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";

import useGetAllBoards from "../hook/useGetAllBoards";

type BoardSelectorProps = {
  isNewBoard: boolean;
  setIsNewBoard: (value: boolean) => void;
};

const BoardSelector = ({ isNewBoard, setIsNewBoard }: BoardSelectorProps) => {
  const form = useFormContext<CreatePinFormSchemaType>();

  const { boards, status } = useGetAllBoards();

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <FormField
        control={form.control}
        name="board"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Board</FormLabel>
            <Select
              onValueChange={(val) => {
                field.onChange(val);
                setIsNewBoard(val === "new-board");
              }}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700">
                <SelectValue placeholder="Select a board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-board">Create New Board</SelectItem>

                {boards.map((board) => (
                  <SelectItem
                    key={board.id}
                    value={board.id}
                  >
                    {board.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {isNewBoard ? (
        <div className="mt-4 rounded-lg border border-dashed p-4">
          <h4 className="mb-2 text-lg font-semibold">Create New Board</h4>
          <div className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="newBoardTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="newBoardTitle">Board Name</FormLabel>
                  <Input
                    id="newBoardTitle"
                    {...field}
                    placeholder="e.g. Travel Ideas"
                    className="rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newBoardDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="newBoardDescription">
                    Description
                  </FormLabel>
                  <Textarea
                    id="newBoardDescription"
                    {...field}
                    placeholder="e.g. Travel Ideas"
                    className="rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isBoardPrivate"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 rounded-lg border p-4 shadow-sm">
                  <Checkbox
                    id="isBoardPrivate"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-5 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
                  />
                  <FormLabel
                    htmlFor="isBoardPrivate"
                    className="text-sm font-medium text-gray-700"
                  >
                    Is this board private?
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BoardSelector;
