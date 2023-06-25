import React from "react";
import NavigationBar from "../../components/NavigationBar/Navigation";
import { Frame } from "@shopify/polaris";
import { Outlet } from "react-router-dom";
export default function Root() {
  return (
    <Frame>
      <NavigationBar />
      <Outlet />
    </Frame>
  );
}
