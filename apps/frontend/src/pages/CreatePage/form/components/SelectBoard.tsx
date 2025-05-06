import { Controller } from "react-hook-form";

import { FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

// Import Controller

import { useCreatePinForm } from "../hook/useCreatePin";

const SelectBoard = () => {
  const { form, isNewBoard, setIsNewBoard } = useCreatePinForm();

  return (
    <div>
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

                // Reset the newBoardTitle when selecting an existing board
                if (val !== "new-board") {
                  form.setValue("newBoardTitle", "");
                }
              }}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700">
                <SelectValue placeholder="Select a board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-board">Create New Board</SelectItem>
                {/* Replace with actual dynamic board list */}
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {isNewBoard ? (
        <div className="mt-4 rounded-lg border border-dashed p-4">
          <h4 className="mb-2 text-lg font-semibold">Create New Board</h4>
          <Controller
            control={form.control}
            name="newBoardTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board Name</FormLabel>
                <Input
                  {...field}
                  placeholder="e.g. Travel Ideas"
                  className="rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SelectBoard;
