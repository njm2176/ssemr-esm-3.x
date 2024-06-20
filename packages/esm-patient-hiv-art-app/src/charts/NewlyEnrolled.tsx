import React, { useContext } from "react";
import { SimpleBarChart } from "@carbon/charts-react";
import { Loading } from "@carbon/react";
import "@carbon/charts/styles.css";
import styles from "./styles/index.scss";
import { DashboardContext } from "../context/DashboardContext";
import { ScaleTypes } from "../types";
import ChartWrapperComponent from "./components/chart-wrapper.component";

const NewlyEnrolled = () => {
  const {
    chartData: { newlyEnrolledClients },
    currentTimeFilter,
  } = useContext(DashboardContext);
  console.log("processed chart data", newlyEnrolledClients?.processedChartData);
  console.log("current Time filter", currentTimeFilter);
  const options = {
    title: "Clients newly enrolled on ART",
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
      {newlyEnrolledClients.loading ? (
        <Loading className={styles.spinner} withOverlay={false} />
      ) : (
        <ChartWrapperComponent
          currentTimeFilter={currentTimeFilter}
          chartName="NewlyEnrolled Clients"
          data={newlyEnrolledClients?.processedChartData}
        >
          <SimpleBarChart
            data={newlyEnrolledClients?.processedChartData}
            options={options}
          />
        </ChartWrapperComponent>
      )}
    </div>
  );
};

export default NewlyEnrolled;
