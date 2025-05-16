import { useState } from "react";

import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";

import LoginForm from "@/form/auth/LoginForm";
import RegisterForm from "@/form/auth/RegisterForm";

const LoginPage = () => {
  const [formName, setFormName] = useState<"login" | "register">("login");

  return (
    <main className="mx-auto min-h-screen max-w-7xl">
      <div className="flex w-full items-center justify-start py-16 pl-14">
        <Button
          onClick={() => {
            setFormName(formName === "login" ? "register" : "login");
          }}
        >
          {formName === "login" ? "Sign Up" : "Login"}
        </Button>
      </div>
      <Card className="mx-auto mb-20 max-w-md bg-gray-100/10 px-10">
        <CardHeader>
          <CardTitle className="text-center">
            {formName === "login" ? "Login Here" : "Create New Account"}
          </CardTitle>
          <CardDescription>
            {formName === "login"
              ? "Login to your account"
              : "Create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formName === "login" ? <LoginForm /> : <RegisterForm />}
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
