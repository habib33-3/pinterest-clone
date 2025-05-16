import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import SubmitButton from "@/components/buttons/SubmitButton";
import PasswordField from "@/components/form-fields/PasswordField";

import { useUserStore } from "@/stores/userStore";

import { createUserApi } from "@/api/userApi";

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
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleFormSubmit = async (data: RegisterUserFormSchemaType) => {
    try {
      const res = await createUserApi(data);

      console.info(res);

      if (res.data.data) {
        setUser(res.data.data);
        toast.success("User registered successfully");
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
