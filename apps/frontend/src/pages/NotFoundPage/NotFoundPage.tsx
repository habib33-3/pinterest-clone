import { Link, useNavigate } from "react-router";

import { Button } from "@/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="mb-4 text-6xl font-extrabold text-gray-800">404</h1>
      <p className="mb-6 text-lg text-gray-600">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="flex gap-4">
        <Link to="/">
          <Button
            variant="outline"
            className="text-base"
          >
            Go to Home
          </Button>
        </Link>
        <Button
          onClick={() => navigate(-1)}
          className="text-base"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
