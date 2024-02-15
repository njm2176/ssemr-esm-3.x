import React, { useContext } from "react";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import "./index.scss";
import { DashboardContext } from "../context/DashboardContext";

const NewlyEnrolled = () => {
  const { newlyEnrolledClients, getDummyData, currentTimeFilter } =
    useContext(DashboardContext);

  const options = {
    title: "Newly Enrolled Clients",
    axes: {
      bottom: {
        title: currentTimeFilter,
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
    <div className="">
      {newlyEnrolledClients?.processedChartData && (
        <LineChart
          data={newlyEnrolledClients?.processedChartData}
          options={options}
        />
      )}
    </div>
  );
};

export default NewlyEnrolled;
