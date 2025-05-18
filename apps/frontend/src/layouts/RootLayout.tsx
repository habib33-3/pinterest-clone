import { Suspense } from "react";

import { Outlet } from "react-router";

import Navbar from "@/shared/Navbar/Navbar";
import Sidebar from "@/shared/Navbar/components/Sidebar";

import { Skeleton } from "@/ui/skeleton";

const RootLayout = () => {
  return (
    <main className="flex w-full gap-4">
      <Sidebar />
      <div className="mr-4 flex-1">
        <Navbar />
        <Suspense fallback={<Skeleton />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};

export default RootLayout;
