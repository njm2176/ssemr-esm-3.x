import React from "react";
import { Home } from "@carbon/react/icons";
import styles from "./home-dashboard.scss";
import { useTranslation } from "react-i18next";
import SSEMRTab from "./components/tabs/SSEMRTab";
import { useHomeDashboard } from "./hooks/useHomeDashboard";
import StatCard from "./components/cards/StatCard";
import { SimpleBarChart } from "@carbon/charts";
import "@carbon/charts/styles.css";

const HomeDashboard = () => {
  const { t } = useTranslation();

  const { tabInfo, stats } = useHomeDashboard();

  return (
    <div className={styles.parent}>
      {/* ................Title......................... */}
      <div className={styles.titleContainer}>
        <Home color="green" size="24" className={styles.homeIcon} />
        <p className={styles.titleText}>{t("home", "Home")}</p>
        <p className={styles.dashboardText}>{t("dashboard", "Dashboard")}</p>
      </div>

      {/* ..................Tabs................. */}
      <div className={styles.tabs}>
        {tabInfo.map((item) => (
          <SSEMRTab
            name={item.title}
            key={item.title}
            handler={undefined}
            isActive={undefined}
          />
        ))}
      </div>

      {/* ...................Stats.................... */}
      <div className={styles.stats}>
        {stats.map((stat) => (
          <StatCard item={stat} key={stat.title} />
        ))}
      </div>

      {/* ...............Charts....................... */}
      <div className={styles.chartWrapper}></div>
    </div>
  );
};

export default HomeDashboard;
