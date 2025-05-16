import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router";

import "./index.css";
import AppProvider from "./providers/AppProvider";
import router from "./router/router";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
