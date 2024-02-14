import React from "react";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import "./index.scss";
import { useHomeDashboard } from "../hooks/useHomeDashboard";

const NewlyEnrolled = () => {
  const { newlyEnrolledClients } = useHomeDashboard();

  const formatSummary = () => {
    const monthsArray = Object.keys(newlyEnrolledClients.summary.groupYear);
    const formattedData = monthsArray.map((month) => ({
      month: month,
      clients: newlyEnrolledClients.summary.groupYear[month],
    }));

    return formattedData;
  };

  const options = {
    title: "Newly Enrolled Clients",
    axes: {
      bottom: {
        title: "Months",
        mapsTo: "month",
        scaleType: "time",
      },
      left: {
        title: " Number of clients",
        mapsTo: "monthEnrolled",
        scaleType: "linear",
      },
    },
    curve: "curveMonotoneX",
    height: "400px",
  };

  return (
    <div className="">
      {newlyEnrolledClients?.summary && (
        <LineChart data={formatSummary()} options={options} />
      )}
    </div>
  );
};

export default NewlyEnrolled;
