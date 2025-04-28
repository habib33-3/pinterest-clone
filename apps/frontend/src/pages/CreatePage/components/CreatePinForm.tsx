import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import SubmitButton from "@/components/buttons/SubmitButton";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  type CreatePinFormSchemaType,
  createPinFormSchema,
} from "@/validations/pin";

const CreatePinForm = () => {
  const form = useForm<CreatePinFormSchemaType>({
    resolver: zodResolver(createPinFormSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      tags: [],
    },
  });

  const onSubmit = (data: CreatePinFormSchemaType) => {
    console.info(data);
  };

  return (
    <div className="flex flex-1 px-10">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label>Title</Label>
                <Input
                  {...field}
                  className="rounded-lg border border-gray-300 bg-muted px-4 py-6 focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label>Description</Label>
                <Textarea
                  {...field}
                  className="rounded-lg border border-gray-300 bg-muted px-4 focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <Label>Link</Label>
                <Input
                  className="rounded-lg border border-gray-300 bg-muted px-4 py-6 focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                  {...field}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <Label>Tags</Label>
                <Input
                  className="rounded-lg border border-gray-300 bg-muted px-4 py-6 focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-700"
                  {...field}
                />
              </FormItem>
            )}
          />

          <SubmitButton
            loading={form.formState.isSubmitting}
            title="Create Pin"
          />
        </form>
      </Form>
    </div>
  );
};

export default CreatePinForm;
