import type { UseFormReturn } from "react-hook-form";

import type { Pin } from "@/types/index";

import type { SavePinToNewBoardSchemaType } from "@/validations/pin";

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
  pin: Pin;
  form: UseFormReturn<SavePinToNewBoardSchemaType>;
  isPending: boolean;
  onSubmit: (data: SavePinToNewBoardSchemaType) => void;
};

const CreateBoardFormView = ({ pin, form, isPending, onSubmit }: Props) => (
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
);

export default CreateBoardFormView;
