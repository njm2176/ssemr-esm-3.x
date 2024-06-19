import React, { useContext } from "react";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { ScaleTypes } from "../types";
import styles from "./styles/index.scss";
import { Loading } from "@carbon/react";
import { DashboardContext } from "../context/DashboardContext";

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
      {activeClients.loading ? (
        <Loading className={styles.spinner} withOverlay={false} />
      ) : (
        <LineChart data={activeClients?.processedChartData} options={options} />
      )}
    </div>
  );
};

export default ActiveClients;
