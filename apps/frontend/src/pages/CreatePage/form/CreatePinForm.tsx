import { cn } from "@/lib/utils";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

import SubmitButton from "@/buttons/SubmitButton";

import BoardSelector from "./components/BoardSelector";
import TagInput from "./components/TagInput";
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
                  <TagInput
                    tags={tags}
                    setTags={(newTags) => {
                      setTags(newTags);
                      form.setValue("tags", newTags);
                    }}
                    handleAddTags={handleAddTags}
                    disabled={!uploadedImage}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="board"
                render={() => (
                  <BoardSelector
                    isNewBoard={isNewBoard}
                    setIsNewBoard={setIsNewBoard}
                  />
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePinForm;
