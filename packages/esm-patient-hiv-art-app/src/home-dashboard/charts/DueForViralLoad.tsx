import React, { useContext } from "react";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import styles from "./styles/index.scss";
import { DashboardContext } from "../context/DashboardContext";
import { Loading } from "@carbon/react";
import { ScaleTypes } from "../types";

const DueForViralLoad = () => {
  const {
    chartData: { dueForViralLoad },
    currentTimeFilter,
  } = useContext(DashboardContext);

  const options = {
    title: "Due for viral load",
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
      {dueForViralLoad?.processedChartData?.length > 0 &&
      dueForViralLoad?.processedChartData[0][currentTimeFilter] ? (
        <LineChart
          data={dueForViralLoad?.processedChartData}
          options={options}
        />
      ) : (
        <Loading className={styles.spinner} withOverlay={false} />
      )}
    </div>
  );
};

export default DueForViralLoad;
