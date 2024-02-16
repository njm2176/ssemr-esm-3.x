import React, { useContext } from "react";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import styles from "./index.scss";
import { DashboardContext } from "../context/DashboardContext";
import { Loading } from "@carbon/react";

const DueForViralLoad = () => {
  const { dueForViralLoad, currentTimeFilter } = useContext(DashboardContext);

  const options = {
    title: "Due for viral load",
    axes: {
      bottom: {
        title: "",
        mapsTo: currentTimeFilter,
        scaleType: "labels",
      },
      left: {
        title: " Number of clients",
        mapsTo: "clients",
        scaleType: "linear",
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
