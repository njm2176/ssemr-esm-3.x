import React from "react";
import { SWRConfig } from "swr";
import HomeDashboard from "./views/home-dashboard.component";
import DashboardProvider from "./context/DashboardContext";
import classnames from "classnames";
import styles from "./root.scss";
import { BrowserRouter } from "react-router-dom";

const RootComponent: React.FC = () => {
  const baseName = window.getOpenmrsSpaBase() + "home/hivcare-and-art";

  return (
    <main
      className={classnames("omrs-main-content", styles.dashboardContainer)}
    >
      <SWRConfig>
        <BrowserRouter basename={baseName}>
          <DashboardProvider>
            <HomeDashboard />
          </DashboardProvider>
        </BrowserRouter>
      </SWRConfig>
    </main>
  );
};

export default RootComponent;
