import React, { useContext } from "react";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import styles from "./index.scss";
import { Loading } from "@carbon/react";
import { DashboardContext } from "../context/DashboardContext";
import { ScaleTypes } from "../types";

const ViralLoadResults = () => {
  const { viralLoadResults, currentTimeFilter } = useContext(DashboardContext);

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
      {viralLoadResults?.processedChartData?.length > 0 &&
      viralLoadResults?.processedChartData[0][currentTimeFilter] ? (
        <LineChart
          data={viralLoadResults?.processedChartData}
          options={options}
        />
      ) : (
        <Loading className={styles.spinner} withOverlay={false} />
      )}
    </div>
  );
};

export default ViralLoadResults;
