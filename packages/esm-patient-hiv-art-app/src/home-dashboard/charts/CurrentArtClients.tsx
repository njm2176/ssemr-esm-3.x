import React, { useEffect } from "react";
import { currentARTClients } from "../dummy/data";
import { AreaChart, LineChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import "./index.scss";
import { useHomeDashboard } from "../hooks/useHomeDashboard";
import useSWR from "swr";
import { openmrsFetch } from "@openmrs/esm-framework";

const NewlyEnrolled = () => {
  const { activeClients, getDummyData } = useHomeDashboard();

  const { data, error } = useSWR(
    "/ws/rest/v1/ssemr/dashboard/newClients?startDate=2024/01/15&endDate=2024/02/14",
    openmrsFetch,
    {}
  );

  const options = {
    title: "Currently Enrolled Clients",
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
        <LineChart data={getDummyData()} options={options} />
      )}
    </div>
  );
};

export default NewlyEnrolled;
