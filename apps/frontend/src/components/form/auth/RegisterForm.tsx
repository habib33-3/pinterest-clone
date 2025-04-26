import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import PasswordField from "@/components/shared/PasswordField";
import SubmitButton from "@/components/shared/SubmitButton";

import { api } from "@/lib/api";

import {
  type RegisterUserFormSchemaType,
  registerUserFormSchema,
} from "@/validations/auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";

const RegisterForm = () => {
  const form = useForm<RegisterUserFormSchemaType>({
    resolver: zodResolver(registerUserFormSchema),
    defaultValues: {
      email: "",
      userName: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (data: RegisterUserFormSchemaType) => {
    try {
      const res = await api.post("/user", {
        email: data.email,
        userName: data.userName,
        displayName: data.displayName,
        password: data.password,
      });

      if (res.status === 201) {
        toast.success("User registered successfully");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      if (error instanceof AxiosError) {
        const errorMessage = (error.response?.data as { message?: string })
          .message;

        toast.error(errorMessage ?? "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordField
          form={form}
          name="password"
        />
        <PasswordField
          form={form}
          name="confirmPassword"
          label="Confirm Password"
        />

        <SubmitButton
          loading={form.formState.isSubmitting}
          title="Register"
        />
      </form>
    </Form>
  );
};

export default RegisterForm;
