import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";

import SubmitButton from "@/buttons/SubmitButton";

import { useCreatePinForm } from "./hook/useCreatePin";

const CreatePinForm = () => {
  const {
    form,
    isNewBoard,
    setIsNewBoard,
    onSubmit,
    mutation,
    handleAddTags,
    setTags,
    tags,
    uploadedImage,
  } = useCreatePinForm();

  return (
    <div className="flex flex-1 items-start justify-center px-6 py-10 md:px-10">
      <div className="w-full max-w-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "",
              !uploadedImage && "pointer-events-none opacity-50"
            )}
          >
            <div className="flex items-center justify-end">
              <SubmitButton
                className="w-32"
                loading={
                  mutation.status === "pending" || form.formState.isSubmitting
                }
                title="Publish"
              />
            </div>
            <div className="mt-6 w-full flex-col items-center justify-center space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                      id="title"
                      {...field}
                      disabled={!uploadedImage}
                      placeholder="Enter pin title"
                      className="rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      id="description"
                      {...field}
                      disabled={!uploadedImage}
                      placeholder="Add a description..."
                      className="rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="link">Link</FormLabel>
                    <Input
                      {...field}
                      id="link"
                      disabled={!uploadedImage}
                      placeholder="Paste a destination link (optional)"
                      className="rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <div className="flex flex-col space-y-2">
                    <FormItem>
                      <FormLabel htmlFor="tags">Tags</FormLabel>

                      <Input
                        type="text"
                        id="tags"
                        placeholder="Type and press enter or comma"
                        onKeyDown={(e) => {
                          handleAddTags(e);
                        }}
                        disabled={!uploadedImage}
                        className="rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                      />
                      <FormMessage />
                    </FormItem>
                    <div className="rounded-lg px-4 py-3">
                      <div className="mb-2 flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <Badge
                            key={tag}
                            className="flex items-center gap-2 rounded-full bg-green-600 px-2 py-1 text-sm text-white shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                          >
                            {tag}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const newTags = tags.filter(
                                  (_, i) => i !== index
                                );
                                setTags(newTags);
                                form.setValue("tags", newTags);
                              }}
                              className="ml-2 transition duration-200"
                            >
                              <X className="size-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              />

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
                        <SelectItem value="new-board">
                          Create New Board
                        </SelectItem>
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
                  <h4 className="mb-2 text-lg font-semibold">
                    Create New Board
                  </h4>
                  <FormField
                    control={form.control}
                    name="newBoardTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="newBoardTitle">
                          Board Name
                        </FormLabel>
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
                </div>
              ) : null}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePinForm;
