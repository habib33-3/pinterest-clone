import type { PropsWithChildren } from "react";

import { Toaster } from "@/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-center"
        richColors
      />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default AppProvider;
