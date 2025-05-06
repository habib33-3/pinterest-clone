import { X } from "lucide-react";

import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";

import { useCreatePinForm } from "../hook/useCreatePin";

const TagInput = () => {
  const { form, tags, setTags } = useCreatePinForm();
  const { uploadedImage } = useCreatePinForm();

  const handleAddTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const value = input.value.trim();

    if ((e.key === "Enter" || e.key === ",") && value) {
      e.preventDefault();
      if (!tags.includes(value)) {
        const updatedTags = [...tags, value];
        setTags(updatedTags);
        form.setValue("tags", updatedTags);
        form.clearErrors("tags");
      }
      input.value = "";
    }
  };

  return (
    <FormField
      control={form.control}
      name="tags"
      render={({ field }) => (
        <div className="flex flex-col space-y-2">
          <FormItem>
            <FormLabel htmlFor="tags">Tags</FormLabel>

            <Input
              {...field}
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
                      const newTags = tags.filter((_, i) => i !== index);
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
  );
};

export default TagInput;
