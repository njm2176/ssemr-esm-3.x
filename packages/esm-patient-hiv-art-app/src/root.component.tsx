import React from "react";
import { SWRConfig } from "swr";
import HomeDashboard from "./home-dashboard/home-dashboard.component";

const swrConfiguration = {
  errorRetryCount: 3,
};

const RootComponent: React.FC = () => {
  return (
    <main>
      <SWRConfig value={swrConfiguration}>
        <HomeDashboard />
      </SWRConfig>
    </main>
  );
};

export default RootComponent;
