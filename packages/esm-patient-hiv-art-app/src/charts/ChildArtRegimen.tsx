import React, { useContext } from "react";
import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { ScaleTypes } from "../types";
import { DashboardContext } from "../context/DashboardContext";
import styles from "./styles/index.scss";
import { Loading } from "@carbon/react";
import ChartWrapperComponent from "./components/chart-wrapper.component";

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
        <ChartWrapperComponent
          data={childART?.processedChartData}
          chartName="Child ART Regimen"
        >
          <SimpleBarChart
            data={childART?.processedChartData}
            options={options}
          />
        </ChartWrapperComponent>
      )}
    </div>
  );
};

export default ChildArtRegimen;
