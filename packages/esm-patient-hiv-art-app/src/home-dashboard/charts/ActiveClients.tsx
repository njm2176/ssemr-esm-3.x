import React, { useContext } from "react";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { DashboardContext } from "../context/DashboardContext";
import { ScaleTypes } from "../types";
import styles from "./styles/index.scss";
import { Loading } from "@carbon/react";

const ActiveClients = () => {
  const {
    chartData: { activeClients },
    currentTimeFilter,
  } = useContext(DashboardContext);

  const options = {
    title: "Active clients",
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
      {activeClients?.processedChartData?.length === 0 ? (
        <div className={styles.noRecords}>
          <p className={styles.noRecordsTitle}>Active clients</p>
          <p className={styles.noRecordsText}>No records</p>
        </div>
      ) : activeClients?.processedChartData?.length > 0 &&
        activeClients?.processedChartData[0][currentTimeFilter] ? (
        <LineChart data={activeClients?.processedChartData} options={options} />
      ) : (
        <Loading className={styles.spinner} withOverlay={false} />
      )}
    </div>
  );
};

export default ActiveClients;
