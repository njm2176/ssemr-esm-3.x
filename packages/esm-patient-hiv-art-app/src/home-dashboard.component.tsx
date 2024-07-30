import React, { useContext } from "react";
import { Home } from "@carbon/react/icons";
import styles from "./home-dashboard.scss";
import { useTranslation } from "react-i18next";
import StatCard from "./components/cards/StatCard";
import "@carbon/charts/styles.css";
import SSEMRTab from "./components/tabs/SSEMRTab";
import ActiveClients from "./charts/ActiveClients";
import ChartCard from "./components/cards/ChartCard";
import { DashboardContext } from "./context/DashboardContext";
import { TimeFilter } from "./components/filter/TimeFilter";
import NewlyEnrolled from "./charts/NewlyEnrolled";
import AdultARTRegimen from "./charts/AdultArtRegimen";
import ChildArtRegimen from "./charts/ChildArtRegimen";
import UnderCommunityCare from "./charts/UnderCommunityCare";
import DueForViralLoad from "./charts/DueForViralLoad";
import ViralLoadSamples from "./charts/ViralLoadSamples";
import Waterfall from "./charts/Waterfall";
import ViralLoadResults from "./charts/ViralLoadResults";
import ViralLoadCoverage from "./charts/ViralLoadCoverage";
import ViralLoadSuppression from "./charts/ViralLoadSuppression";
import HighViralLoadCascade from "./charts/HighViralLoadCascade";
import D3BarChartComponent from "./charts/components/bar-graph/d3-bar-chart.component";
import D3PieChartComponent from "./charts/components/pie-chart/d3-pie-chart.component";
import D3LineGraphComponent from "./charts/components/line-graph/d3-line-graph.component";
import D3WaterfallComponent from "./charts/components/waterfall/d3-waterfall.component";
import { processWaterfallData } from "./helpers/dataManipulation";
import { renderWaterfallTooltip } from "./helpers/tooltips";

const HomeDashboard = () => {
  const { t } = useTranslation();

  const {
    stats,
    filterTabs,
    currentTopFilterIndex,
    chartData: {
      activeClients,
      underCareOfCommunityProgram,
      allClients,
      viralLoadSamples,
      waterfall,
    },
    currentTimeFilter,
    defaultStatHeaders,
    txCURRHeaders,
  } = useContext(DashboardContext);
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
        <div className={styles.twoGridChartWrapper}>
          <ChartCard>
            <NewlyEnrolled />
          </ChartCard>
          <D3BarChartComponent
            loading={activeClients?.loading}
            tooltipRenderFunction={(row) => `Clients: ${row.clients}`}
            chartData={activeClients?.processedChartData}
            listData={activeClients?.raw?.results}
            title="Clients currently receiving ART (TX_CURR)"
            headerTableColumns={txCURRHeaders}
            xKey={currentTimeFilter}
            yKey={"clients"}
          />
        </div>

        {/*  /!* ...............Charts....................... *!/*/}
        <div className={styles.chartWrapper}>
          <ChartCard>
            <AdultARTRegimen />
          </ChartCard>
          <ChartCard>
            <ChildArtRegimen />
          </ChartCard>
          <D3PieChartComponent
            chartData={[
              {
                name: "Other clients",
                value:
                  allClients?.raw?.results?.length -
                  underCareOfCommunityProgram?.raw?.results?.length,
              },
              {
                name: "Under Care",
                value: underCareOfCommunityProgram?.raw?.results?.length,
              },
            ]}
            total={allClients?.raw?.results?.length}
            listData={underCareOfCommunityProgram?.raw?.results}
            title="Under Care Of Community Programmes"
            tooltipRenderFunction={(item) =>
              `${item.data.name}: ${Math.round(
                (item.data.value / allClients?.raw?.results?.length) * 100
              )}%`
            }
            headerTableColumns={defaultStatHeaders}
            loading={underCareOfCommunityProgram.loading}
          />
        </div>

        {/* ...............Charts....................... */}
        <div className={styles.twoGridChartWrapper}>
          <ChartCard>
            <DueForViralLoad />
          </ChartCard>
          <D3LineGraphComponent
            loading={viralLoadSamples?.loading}
            tooltipRenderFunction={(row) => `Clients: ${row.clients}`}
            chartData={viralLoadSamples?.processedChartData}
            listData={viralLoadSamples?.raw?.results}
            title="Viral load samples collected"
            headerTableColumns={defaultStatHeaders}
            xKey={currentTimeFilter}
            yKey={"clients"}
          />
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

        <D3WaterfallComponent
          chartData={processWaterfallData(waterfall?.processedChartData)}
          listData={viralLoadSamples?.raw?.results}
          title="Waterfall Chart"
          tooltipRenderFunction={({ currentItem, previousItem }) =>
            renderWaterfallTooltip({
              currentValue: currentItem,
              previousValue: previousItem,
            })
          }
          headerTableColumns={defaultStatHeaders}
          xKey={"group"}
          loading={waterfall.loading}
        />

        {/*<ChartCard>*/}
        {/*  <Waterfall />*/}
        {/*</ChartCard>*/}
      </div>
    </div>
  );
};

export default HomeDashboard;
