import { Link } from "react-router";

import { Button } from "@/ui/button";

type ErrorPageProps = {
  title?: string;
  message?: string;
  description?: string;
};

const ErrorPage = ({
  title = "Oops!",
  message = "Something went wrong",
  description = "An unexpected error occurred. Please try again later.",
}: ErrorPageProps) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-red-50 px-4 text-center">
      <h1 className="mb-4 text-5xl font-bold text-red-700">{title}</h1>
      <p className="mb-2 text-2xl font-semibold text-red-600">{message}</p>
      <p className="mb-6 text-base text-red-500">{description}</p>
      <Link
        to="/"
        aria-label="Go back to home"
      >
        <Button
          variant="destructive"
          className="transition-transform hover:scale-105"
        >
          Back to Home
        </Button>
      </Link>
    </main>
  );
};

export default ErrorPage;
