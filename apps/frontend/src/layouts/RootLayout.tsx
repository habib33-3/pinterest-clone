import { Outlet } from "react-router";

import Navbar from "@/shared/Navbar/Navbar";

const RootLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default RootLayout;
