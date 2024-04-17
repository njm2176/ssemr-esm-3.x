import React, { useContext } from "react";
import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { ScaleTypes } from "../types";
import { DashboardContext } from "../context/DashboardContext";
import styles from "./styles/index.scss";
import { Loading } from "@carbon/react";

const ChildArtRegimen = () => {
  const {
    chartData: { childART },
    currentTimeFilter,
  } = useContext(DashboardContext);

  const options = {
    title: "Child ART Regimen",
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
      {childART?.processedChartData?.length > 0 &&
      childART?.processedChartData[0][currentTimeFilter] ? (
        <SimpleBarChart data={childART?.processedChartData} options={options} />
      ) : (
        <Loading className={styles.spinner} withOverlay={false} />
      )}
    </div>
  );
};

export default ChildArtRegimen;
