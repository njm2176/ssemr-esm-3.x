import React, { useContext, useEffect } from "react";
import { Home } from "@carbon/react/icons";
import styles from "./home-dashboard.scss";
import { useTranslation } from "react-i18next";
import StatCard from "./components/cards/StatCard";
import { Dropdown } from "@carbon/react";
import "@carbon/charts/styles.css";
import NewlyEnrolled from "./charts/NewlyEnrolled";
import SSEMRTab from "./components/tabs/SSEMRTab";
import CurrentlyEnrolled from "./charts/CurrentArtClients";
// import ActiveClients from "./charts/ActiveClients";
import AdultARTRegimen from "./charts/AdultArtRegimen";
import ChildArtRegimen from "./charts/ChildArtRegimen";
import UnderCommunityCare from "./charts/UnderCommunityCare";
import DueForViralLoad from "./charts/DueForViralLoad";
import ViralLoadSamples from "./charts/ViralLoadSamples";
import ViralLoadCoverage from "./charts/ViralLoadCoverage";
import ViralLoadSuppression from "./charts/ViralLoadSuppression";
import HighViralLoadCascade from "./charts/HighViralLoadCascade";
import ChartCard from "./components/cards/ChartCard";
import { DashboardContext, filterOptions } from "./context/DashboardContext";

const HomeDashboard = () => {
  const { t } = useTranslation();

  const { currentTimeFilter, setCurrentTimeFilter, stats, tabInfo } =
    useContext(DashboardContext);

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
        <div
          style={{
            width: 400,
          }}
        >
          <Dropdown
            id="filter"
            titleText=""
            initialSelectedItem={filterOptions[1]}
            onChange={(evt) => {
              console.log("evt", evt.selectedItem.value);
              setCurrentTimeFilter(evt.selectedItem.value);
            }}
            label=""
            items={filterOptions}
            itemToString={(item) => item.name}
          />
        </div>
      </div>

      {/* ...................Stats.................... */}
      <div className={styles.stats}>
        {stats.map((stat) => (
          <StatCard item={stat} key={stat.title} />
        ))}
      </div>

      {/* ...............Charts....................... */}
      <div className={styles.chartWrapper}>
        <ChartCard>
          <NewlyEnrolled />
        </ChartCard>
        {/*<ChartCard>*/}
        {/*  <CurrentlyEnrolled />*/}
        {/*</ChartCard>*/}
        {/*<ChartCard>*/}
        {/*  <ActiveClients />*/}
        {/*</ChartCard>*/}
      </div>

      {/* ...............Charts....................... */}
      <div className={styles.chartWrapper}>
        {/*<ChartCard>*/}
        {/*  <AdultARTRegimen />*/}
        {/*</ChartCard>*/}
        {/*<ChartCard>*/}
        {/*  <ChildArtRegimen />*/}
        {/*</ChartCard>*/}
        {/*<ChartCard>*/}
        {/*  <UnderCommunityCare />*/}
        {/*</ChartCard>*/}
      </div>

      {/* ...............Charts....................... */}
      <div className={styles.twoGridChartWrapper}>
        <ChartCard>
          <DueForViralLoad />
        </ChartCard>
        <ChartCard>
          <ViralLoadSamples />
        </ChartCard>
      </div>

      {/* ...............Charts....................... */}
      <div className={styles.chartWrapper}>
        <ChartCard>
          <DueForViralLoad />
        </ChartCard>
        <ChartCard>
          <ViralLoadCoverage />
        </ChartCard>
        <ChartCard>
          <ViralLoadSuppression />
        </ChartCard>
      </div>

      <ChartCard>
        <HighViralLoadCascade />
      </ChartCard>
    </div>
  );
};

export default HomeDashboard;
