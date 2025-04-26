import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import PasswordField from "@/components/shared/PasswordField";
import SubmitButton from "@/components/shared/SubmitButton";

import { api } from "@/lib/api";

import { type LoginFormSchemaType, loginFormSchema } from "@/validations/auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";

const LoginForm = () => {
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormSchemaType) => {
    try {
      const res = await api.post("/user/login", {
        email: data.email,
        password: data.password,
      });

      if (res.status === 200) {
        toast.success("User logged in successfully");
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
        onSubmit={form.handleSubmit(handleLogin)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PasswordField
          form={form}
          name="password"
        />

        <SubmitButton
          title="Login"
          loading={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

export default LoginForm;
