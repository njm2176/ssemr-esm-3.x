import React, { useContext } from "react";
import { Home } from "@carbon/react/icons";
import styles from "./home-dashboard.scss";
import { useTranslation } from "react-i18next";
import StatCard from "./components/cards/StatCard";
import "@carbon/charts/styles.css";
import NewlyEnrolled from "./charts/NewlyEnrolled";
import SSEMRTab from "./components/tabs/SSEMRTab";
import CurrentlyEnrolled from "./charts/CurrentArtClients";
import ActiveClients from "./charts/ActiveClients";
import AdultARTRegimen from "./charts/AdultArtRegimen";
import ChildArtRegimen from "./charts/ChildArtRegimen";
import UnderCommunityCare from "./charts/UnderCommunityCare";
import ChartCard from "./components/cards/ChartCard";
import { DashboardContext } from "./context/DashboardContext";
import Waterfall from "./charts/Waterfall";
import { TimeFilter } from "./components/filter/TimeFilter";
import DueForViralLoad from "./charts/DueForViralLoad";
import ViralLoadSamples from "./charts/ViralLoadSamples";
import ViralLoadResults from "./charts/ViralLoadResults";
import ViralLoadCoverage from "./charts/ViralLoadCoverage";
import ViralLoadSuppression from "./charts/ViralLoadSuppression";
import HighViralLoadCascade from "./charts/HighViralLoadCascade";

const HomeDashboard = () => {
  const { t } = useTranslation();

  const { stats, filterTabs, currentTopFilterIndex } =
    useContext(DashboardContext);

  return (
    <div style={{ position: "relative" }}>
      {/* ................Title......................... */}
      <div className={styles.header}>
        <div className={styles["left-justified-items"]}>
          <Home color="green" size="34" className={styles.homeIcon} />
          <div className={styles["page-labels"]}>
            <p className={styles.title}>
              {t("hivCareAndARTDashboard", "HIV Care and ART Dashboard")}
            </p>
          </div>
        </div>
        <div
          style={{
            width: "fit-content",
            maxWidth: "500px",
          }}
        >
          <TimeFilter />
        </div>
      </div>
      <div className={styles.parent}>
        {/* ..................Tabs................. */}
        <div className={styles.tabs}>
          {filterTabs.map((item) => (
            <SSEMRTab
              index={item.index}
              name={item.title}
              key={item.title}
              handler={item.filterFunction}
              isActive={currentTopFilterIndex == item.index}
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
        <div className={styles.chartWrapper}>
          <ChartCard>
            <NewlyEnrolled />
          </ChartCard>
          <ChartCard>
            <CurrentlyEnrolled />
          </ChartCard>
          <ChartCard>
            <ActiveClients />
          </ChartCard>
        </div>

        {/* ...............Charts....................... */}
        <div className={styles.chartWrapper}>
          <ChartCard>
            <AdultARTRegimen />
          </ChartCard>
          <ChartCard>
            <ChildArtRegimen />
          </ChartCard>
          <ChartCard>
            <UnderCommunityCare />
          </ChartCard>
        </div>

        <ChartCard>
          <Waterfall />
        </ChartCard>

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
            <ViralLoadResults />
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
    </div>
  );
};

export default HomeDashboard;
