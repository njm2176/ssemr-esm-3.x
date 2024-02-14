import React, { useEffect, useState } from "react";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import "./index.scss";
import { useHomeDashboard } from "../hooks/useHomeDashboard";
import useSWR from "swr";
import { openmrsFetch } from "@openmrs/esm-framework";

const NewlyEnrolled = () => {
  const { newlyEnrolledClients } = useHomeDashboard();

  const { data, error } = useSWR(
    "/ws/rest/v1/ssemr/dashboard/newClients?startDate=2024/01/15&endDate=2024/02/14",
    openmrsFetch,
    {}
  );

  const formatSummary = () => {
    const monthsArray = Object.keys(newlyEnrolledClients?.summary?.groupYear);

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
      {newlyEnrolledClients?.summary && (
        <LineChart data={formatSummary()} options={options} />
      )}
    </div>
  );
};

export default NewlyEnrolled;
