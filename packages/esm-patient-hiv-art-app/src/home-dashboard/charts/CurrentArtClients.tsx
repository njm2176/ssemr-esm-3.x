import React, { useEffect } from "react";
import { currentARTClients } from "../dummy/data";
import { AreaChart, LineChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import "./index.scss";
import { useHomeDashboard } from "../hooks/useHomeDashboard";

const NewlyEnrolled = () => {
  const { activeClients } = useHomeDashboard();

  const formatSummary = () => {
    const monthsArray = Object.keys(activeClients?.summary?.groupYear);

    const formattedData = monthsArray.map((month) => ({
      month: month,
      clients: activeClients.summary.groupYear[month],
    }));

    return formattedData;
  };

  const options = {
    title: "Newly Enrolled Clients",
    axes: {
      bottom: {
        title: "Months",
        mapsTo: "month",
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
      {activeClients?.summary && (
        <LineChart data={formatSummary()} options={options} />
      )}
    </div>
  );
};

export default NewlyEnrolled;
