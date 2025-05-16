import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import SubmitButton from "@/components/buttons/SubmitButton";
import PasswordField from "@/components/form-fields/PasswordField";

import { useUserStore } from "@/stores/userStore";

import { loginUserApi } from "@/api/userApi";

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

  const navigate = useNavigate();

  const { setUser } = useUserStore();

  const handleLogin = async (data: LoginFormSchemaType) => {
    try {
      const res = await loginUserApi(data);

      console.info(res);

      if (res.data.data) {
        setUser(res.data.data);
        toast.success("User logged in successfully");
        await navigate("/");
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
