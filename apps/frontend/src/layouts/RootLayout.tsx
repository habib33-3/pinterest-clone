import { Outlet } from "react-router";

import Navbar from "@/shared/Navbar/Navbar";
import Sidebar from "@/shared/Navbar/components/Sidebar";

const RootLayout = () => {
  return (
    <main className="flex w-full gap-4">
      <Sidebar />
      <div className="mr-4 flex-1">
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
