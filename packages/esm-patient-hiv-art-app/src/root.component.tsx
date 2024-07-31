import React from "react";
import { SWRConfig } from "swr";
import HomeDashboard from "./home-dashboard.component";
import DashboardProvider from "./context/DashboardContext";
import classnames from "classnames";
import styles from "./root.scss";

const RootComponent: React.FC = () => {
  return (
    <main className={classnames("omrs-main-content", styles.dashboardContainer)}>
      <SWRConfig>
        <DashboardProvider>
          <HomeDashboard />
        </DashboardProvider>
      </SWRConfig>
    </main>
  );
};

export default RootComponent;
