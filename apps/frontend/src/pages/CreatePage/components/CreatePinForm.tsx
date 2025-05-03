import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useImageStore } from "@/stores/imgStore";

import { cn } from "@/lib/utils";

import {
  type CreatePinFormSchemaType,
  createPinFormSchema,
} from "@/validations/pin";

import { Form, FormField, FormItem, FormLabel } from "@/ui/form";
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

const CreatePinForm = () => {
  const { uploadedImage } = useImageStore();
  const [isNewBoard, setIsNewBoard] = useState(false);

  const form = useForm<CreatePinFormSchemaType>({
    resolver: zodResolver(createPinFormSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      newBoardTitle: "",
      board: "",
      tags: [],
    },
  });

  const onSubmit = (data: CreatePinFormSchemaType) => {
    console.info(data);
  };

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
                loading={form.formState.isSubmitting}
                title="Publish"
              />
            </div>
            <div className="mt-6 w-full flex-col items-center justify-center space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <Input
                      {...field}
                      disabled={!uploadedImage}
                      placeholder="Enter pin title"
                      className="rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      {...field}
                      disabled={!uploadedImage}
                      placeholder="Add a description..."
                      className="rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <Input
                      {...field}
                      disabled={!uploadedImage}
                      placeholder="Paste a destination link (optional)"
                      className="rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <Input
                      {...field}
                      disabled={!uploadedImage}
                      placeholder="Comma-separated tags (e.g. travel, beach)"
                      className="rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                    />
                  </FormItem>
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
                        <FormLabel>Board Name</FormLabel>
                        <Input
                          {...field}
                          placeholder="e.g. Travel Ideas"
                          className="rounded-lg border border-gray-300 bg-muted px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                        />
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
