import type { PropsWithChildren } from "react";

import { Navigate, useLocation } from "react-router";

import { useUserStore } from "@/stores/userStore";

const ProtectedRouter = ({ children }: PropsWithChildren) => {
  const { user } = useUserStore();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default ProtectedRouter;
