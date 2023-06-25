import { Navigation } from "@shopify/polaris";
import {
  HomeMinor,
  SettingsMajor,
  AnalyticsTableMinor,
} from "@shopify/polaris-icons";
import React from "react";
import "./Navigation.css";

export default function NavigationBar() {
  return (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: "/dashboard",
            label: "Dashboard",
            icon: HomeMinor,
          },
          {
            url: "/users",
            label: "Posts Management",
            icon: AnalyticsTableMinor,
          },
          {
            url: "/settings",
            label: "Settings",
            icon: SettingsMajor,
          },
        ]}
      />
    </Navigation>
  );
}
