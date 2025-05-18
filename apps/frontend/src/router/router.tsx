import { Suspense, lazy } from "react";

import { createBrowserRouter } from "react-router";

import { Skeleton } from "@/ui/skeleton";

import ProtectedRouter from "./ProtectedRouter";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));

// Lazy-loaded pages
const CreatePage = lazy(() => import("@/pages/CreatePage/CreatePage"));
const EditPin = lazy(() => import("@/pages/EditPin/EditPin"));
const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"));
const PinPost = lazy(() => import("@/pages/PinPost/PinPost"));
const UserProfile = lazy(() => import("@/pages/UserProfile/UserProfile"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Skeleton />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "create",
        element: (
          <ProtectedRouter>
            <Suspense fallback={<Skeleton />}>
              <CreatePage />
            </Suspense>
          </ProtectedRouter>
        ),
      },
      {
        path: "edit-pin",
        element: (
          <ProtectedRouter>
            <Suspense fallback={<Skeleton />}>
              <EditPin />
            </Suspense>
          </ProtectedRouter>
        ),
      },
      {
        path: "pin/:id",
        element: (
          <Suspense fallback={<Skeleton />}>
            <PinPost />
          </Suspense>
        ),
      },
      {
        path: "/profile/:userName",
        element: (
          <Suspense fallback={<Skeleton />}>
            <UserProfile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Skeleton />}>
        <LoginPage />
      </Suspense>
    ),
  },
]);

export default router;
