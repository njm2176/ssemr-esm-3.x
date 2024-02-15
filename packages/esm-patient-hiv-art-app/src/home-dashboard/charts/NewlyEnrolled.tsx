import React, { useContext } from "react";
import { LineChart } from "@carbon/charts-react";
import { SkeletonPlaceholder } from "@carbon/react";
import "@carbon/charts/styles.css";
import styles from "./index.scss";
import { DashboardContext } from "../context/DashboardContext";

const NewlyEnrolled = () => {
  const { newlyEnrolledClients, currentTimeFilter } =
    useContext(DashboardContext);

  const options = {
    title: "Newly Enrolled Clients",
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
      {newlyEnrolledClients?.processedChartData?.length > 0 &&
      newlyEnrolledClients?.processedChartData[0][currentTimeFilter] ? (
        <LineChart
          data={newlyEnrolledClients?.processedChartData}
          options={options}
        />
      ) : (
        <SkeletonPlaceholder className={styles.skeleton} />
      )}
    </div>
  );
};

export default NewlyEnrolled;
