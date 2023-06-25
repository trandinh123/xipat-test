import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar/Navigation";
import { Frame, Tabs, Page, FormLayout, Layout } from "@shopify/polaris";
import { SubscriptionChart } from "../../components/SubscriptionChart/SubscriptionChart";
import { RevenueChart } from "../../components/RevenueChart/RevenueChart";
import "./Home.css";
import { useLocation, useNavigate } from "react-router-dom";
export default function Home() {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const handleTabChange = (selectedTabIndex) => {
    navigate(
      selectedTabIndex === 0 ? "/dashboard/subscription" : "/dashboard/revenue"
    );
    setSelectedTab(selectedTabIndex);
  };
  const tabs = [
    {
      id: "subscription",
      content: "Subscription",
    },
    {
      id: "revenue",
      content: "Revenue",
    },
  ];
  useEffect(() => {
    if (location.pathname.includes("subscription")) {
      setSelectedTab(0);
    }
    if (location.pathname.includes("revenue")) {
      setSelectedTab(1);
    }
  }, [location]);

  return (
    <Page fullWidth title="Dashboard">
      <FormLayout>
        <Layout>
          <Layout.Section>
            <Tabs
              tabs={tabs}
              selected={selectedTab}
              onSelect={handleTabChange}
            ></Tabs>
          </Layout.Section>
          <Layout.Section>
            {selectedTab === 0 && <SubscriptionChart />}
            {selectedTab === 1 && <RevenueChart />}
          </Layout.Section>
        </Layout>
      </FormLayout>
    </Page>
  );
}
