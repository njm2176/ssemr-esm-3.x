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
  } = useContext(DashboardContext);

  const options = {
    title: "Child ART Regimen",
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
      {childART.loading ? (
        <Loading className={styles.spinner} withOverlay={false} />
      ) : (
        <SimpleBarChart data={childART?.processedChartData} options={options} />
      )}
    </div>
  );
};

export default ChildArtRegimen;
