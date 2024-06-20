import React, { useContext, useEffect } from "react";
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { DashboardContext } from "../context/DashboardContext";
import styles from "./styles/index.scss";
import { Loading } from "@carbon/react";
import ChartWrapperComponent from "./components/chart-wrapper.component";

const ViralLoadCoverage = () => {
  const options = {
    title: "Viral load coverage",
    resizable: true,
    height: "400px",
  };

  const {
    chartData: { viralLoadCoverage, activeClients },
  } = useContext(DashboardContext);

  const formatData = () => {
    return [
      {
        group: "Not covered",
        value:
          activeClients?.raw?.results?.length -
          viralLoadCoverage?.raw?.results?.length,
      },
      {
        group: "Covered",
        value: viralLoadCoverage?.raw?.results?.length,
      },
    ];
  };

  useEffect(() => {
    formatData();
  }, []);

  return (
    <div className={styles.chartContainer}>
      {viralLoadCoverage.loading || activeClients.loading ? (
        <Loading className={styles.spinner} withOverlay={false} />
      ) : (
        <ChartWrapperComponent
          data={viralLoadCoverage?.processedChartData}
          chartName="Viral Load Coverage"
        >
          <PieChart data={formatData()} options={options} />
        </ChartWrapperComponent>
      )}
    </div>
  );
};

export default ViralLoadCoverage;
