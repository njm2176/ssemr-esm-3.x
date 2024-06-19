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
      {adultART.loading ? (
        <Loading className={styles.spinner} withOverlay={false} />
      ) : (
        <SimpleBarChart data={adultART?.processedChartData} options={options} />
      )}
    </div>
  );
};

export default AdultARTRegimen;
