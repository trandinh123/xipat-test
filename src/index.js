import React from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./components/Root/Root";
import PostManagement from "./pages/PostManagement/PostManagement";
import Settings from "./pages/Settings/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "dashboard/*", element: <Home /> },
      { path: "users", element: <PostManagement /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AppProvider i18n={en}>
    <RouterProvider router={router} />
  </AppProvider>
);
