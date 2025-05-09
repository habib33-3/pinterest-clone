import { createBrowserRouter } from "react-router";

import RootLayout from "@/layouts/RootLayout";

import CreatePage from "@/pages/CreatePage/CreatePage";
import EditPin from "@/pages/EditPin/EditPin";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import PinPost from "@/pages/PinPost/PinPost";

import ProtectedRouter from "./ProtectedRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "create",
        element: (
          <ProtectedRouter>
            <CreatePage />
          </ProtectedRouter>
        ),
      },
      {
        path: "edit-pin",
        element: (
          <ProtectedRouter>
            <EditPin />
          </ProtectedRouter>
        ),
      },
      {
        path: "pin/:id",
        element: (
          <ProtectedRouter>
            <PinPost />
          </ProtectedRouter>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
