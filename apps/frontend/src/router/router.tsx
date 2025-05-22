import type { JSX } from "react";
import { Suspense, lazy } from "react";

import { createBrowserRouter } from "react-router";

import { Skeleton } from "@/ui/skeleton";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

import ProtectedRouter from "./ProtectedRouter";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));

const CreatePage = lazy(() => import("@/pages/CreatePage/CreatePage"));
const EditPin = lazy(() => import("@/pages/EditPin/EditPin"));
const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"));
const PinPost = lazy(() => import("@/pages/PinPost/PinPost"));
const UserProfile = lazy(() => import("@/pages/UserProfile/UserProfile"));

const withFallback = (element: JSX.Element) => (
  <Suspense fallback={<Skeleton />}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: withFallback(<RootLayout />),
    children: [
      {
        index: true,
        element: (
          <ProtectedRouter>
            <HomePage />
          </ProtectedRouter>
        ),
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
        path: "profile/:userName",
        element: <UserProfile />,
      },
    ].map((route) => ({
      ...route,
      element: withFallback(route.element),
    })),
  },
  {
    path: "/login",
    element: withFallback(<LoginPage />),
  },
  {
    path: "*",
    element: withFallback(<NotFoundPage />),
  },
]);

export default router;
