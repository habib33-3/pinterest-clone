import { createBrowserRouter } from "react-router";

import RootLayout from "@/layouts/RootLayout";

import CreatePage from "@/pages/CreatePage/CreatePage";
import EditPin from "@/pages/EditPin/EditPin";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import PinPost from "@/pages/PinPost/PinPost";
import UserProfile from "@/pages/UserProfile/UserProfile";

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
        element: <PinPost />,
      },

      {
        path: "/profile/:userName",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
