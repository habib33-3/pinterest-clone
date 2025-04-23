import { createBrowserRouter } from "react-router";

import RootLayout from "@/layouts/RootLayout";

import HomePage from "@/pages/HomePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
