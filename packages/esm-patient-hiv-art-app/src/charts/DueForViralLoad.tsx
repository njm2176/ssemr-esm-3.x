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
      {dueForViralLoad?.loading ? (
        <Loading className={styles.spinner} withOverlay={false} />
      ) : (
        <LineChart
          data={dueForViralLoad?.processedChartData}
          options={options}
        />
      )}
    </div>
  );
};

export default DueForViralLoad;
