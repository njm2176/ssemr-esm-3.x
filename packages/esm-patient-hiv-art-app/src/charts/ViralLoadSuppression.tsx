import React, { useContext, useEffect } from "react";
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { DashboardContext } from "../context/DashboardContext";
import styles from "./styles/index.scss";
import { Loading } from "@carbon/react";
import ChartWrapperComponent from "./components/chart-wrapper.component";

const ViralLoadSuppression = () => {
  const options = {
    title: "Viral load suppression",
    resizable: true,
    height: "400px",
  };

  const {
    chartData: { viralLoadSuppression, viralLoadCoverage },
  } = useContext(DashboardContext);

  const formatData = () => {
    return [
      {
        group: "Unsuppressed",
        value:
          viralLoadCoverage?.raw?.results?.length -
          viralLoadSuppression?.raw?.results?.length,
      },
      {
        group: "Suppressed",
        value: viralLoadSuppression?.raw?.results?.length,
      },
    ];
  };

  useEffect(() => {
    formatData();
  }, []);

  return (
    <div className={styles.chartContainer}>
      {viralLoadSuppression.loading || viralLoadCoverage.loading ? (
        <Loading className={styles.spinner} withOverlay={false} />
      ) : (
        <ChartWrapperComponent
          data={viralLoadSuppression?.processedChartData}
          chartName="Viral Load Suppression"
        >
          <PieChart data={formatData()} options={options} />
        </ChartWrapperComponent>
      )}
    </div>
  );
};

export default ViralLoadSuppression;
