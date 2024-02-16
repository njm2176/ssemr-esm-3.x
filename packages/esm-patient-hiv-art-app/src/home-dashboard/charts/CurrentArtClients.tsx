import React, { useContext, useEffect } from "react";
import { currentARTClients } from "../dummy/data";
import { AreaChart, LineChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import styles from "./index.scss";
import useSWR from "swr";
import { openmrsFetch } from "@openmrs/esm-framework";
import { DashboardContext } from "../context/DashboardContext";
import { Loading, SkeletonPlaceholder } from "@carbon/react";

const NewlyEnrolled = () => {
  const { activeClients, currentTimeFilter } = useContext(DashboardContext);

  const { data, error } = useSWR(
    "/ws/rest/v1/ssemr/dashboard/newClients?startDate=2024/01/15&endDate=2024/02/14",
    openmrsFetch,
    {}
  );

  const options = {
    title: "Currently Enrolled Clients",
    axes: {
      bottom: {
        title: "",
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
    <div className={styles.chartContainer}>
      {activeClients?.processedChartData?.length > 0 &&
      activeClients?.processedChartData[0][currentTimeFilter] ? (
        <LineChart data={activeClients?.processedChartData} options={options} />
      ) : (
        <Loading className={styles.spinner} withOverlay={false} />
      )}
    </div>
  );
};

export default NewlyEnrolled;
