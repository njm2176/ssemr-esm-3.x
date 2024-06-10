import React, { useContext } from "react";
import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { ScaleTypes } from "../types";
import styles from "./styles/index.scss";
import { Loading } from "@carbon/react";
import { DashboardContext } from "../context/DashboardContext";

const AdultARTRegimen = () => {
  const {
    chartData: { adultART },
  } = useContext(DashboardContext);

  const options = {
    title: "Adult ART Regimen",
    axes: {
      bottom: {
        title: "",
        mapsTo: "text",
        scaleType: "labels" as ScaleTypes,
      },
      left: {
        title: "Number of clients",
        mapsTo: "total",
        scaleType: "linear" as ScaleTypes,
      },
    },
    curve: "curveMonotoneX",
    height: "400px",
  };

  return (
    <div className={styles.chartContainer}>
      {adultART?.processedChartData?.length === 0 ? (
        <div className={styles.noRecords}>
          <p className={styles.noRecordsTitle}>Adult ART Regimen</p>
          <p className={styles.noRecordsText}>No records</p>
        </div>
      ) : adultART?.processedChartData?.length > 0 ? (
        <SimpleBarChart data={adultART?.processedChartData} options={options} />
      ) : (
        <Loading className={styles.spinner} withOverlay={false} />
      )}
    </div>
  );
};

export default AdultARTRegimen;
