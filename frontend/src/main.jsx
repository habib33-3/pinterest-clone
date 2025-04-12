import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.jsx";
import "./index.css";
import CreatePage from "./routes/CreatePage/CreatePage.jsx";
import PostPage from "./routes/PostPage/PostPage.jsx";
import AuthPage from "./routes/authPage/AuthPage.jsx";
import HomePage from "./routes/homePage/HomePage.jsx";
import MainLayout from "./routes/layout/mainLayout.jsx";
import SearchPage from "./routes/searchPage/SearchPage.jsx";
import UserProfile from "./routes/userProfile/UserProfile.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/create"
              element={<CreatePage />}
            />
            <Route
              path="/pin/:id"
              element={<PostPage />}
            />
            <Route
              path="/search"
              element={<SearchPage />}
            />
            <Route
              path="/:username"
              element={<UserProfile />}
            />
          </Route>
          <Route
            path="/auth"
            element={<AuthPage />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
