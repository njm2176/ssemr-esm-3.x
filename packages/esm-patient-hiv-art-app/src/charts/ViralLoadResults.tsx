import React, { useContext } from "react";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import styles from "./styles/index.scss";
import { Loading } from "@carbon/react";
import { DashboardContext } from "../context/DashboardContext";
import { ScaleTypes } from "../types";

const ViralLoadResults = () => {
  const {
    chartData: { viralLoadResults },
    currentTimeFilter,
  } = useContext(DashboardContext);

  const options = {
    title: "Viral load results",
    axes: {
      bottom: {
        title: "",
        mapsTo: currentTimeFilter,
        scaleType: "labels" as ScaleTypes,
      },
      left: {
        title: " Number of clients",
        mapsTo: "clients",
        scaleType: "linear" as ScaleTypes,
      },
    },
    curve: "curveMonotoneX",
    height: "400px",
  };
  return (
    <div className={styles.chartContainer}>
      {viralLoadResults.loading ? (
        <Loading className={styles.spinner} withOverlay={false} />
      ) : (
        <LineChart
          data={viralLoadResults?.processedChartData}
          options={options}
        />
      )}
    </div>
  );
};

export default ViralLoadResults;
