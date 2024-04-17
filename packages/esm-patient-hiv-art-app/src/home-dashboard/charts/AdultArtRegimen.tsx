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
    currentTimeFilter,
  } = useContext(DashboardContext);

  const options = {
    title: "Adult ART Regimen",
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
      {adultART?.processedChartData?.length > 0 &&
      adultART?.processedChartData[0][currentTimeFilter] ? (
        <SimpleBarChart data={adultART?.processedChartData} options={options} />
      ) : (
        <Loading className={styles.spinner} withOverlay={false} />
      )}
    </div>
  );
};

export default AdultARTRegimen;
