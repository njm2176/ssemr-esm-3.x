import React from "react";
import { SWRConfig } from "swr";
import HomeDashboard from "./home-dashboard.component";
import DashboardProvider from "./context/DashboardContext";

const RootComponent: React.FC = () => {
  return (
    <main>
      <SWRConfig>
        <DashboardProvider>
          <HomeDashboard />
        </DashboardProvider>
      </SWRConfig>
    </main>
  );
};

export default RootComponent;
