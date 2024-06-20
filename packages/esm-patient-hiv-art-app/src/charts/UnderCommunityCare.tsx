import React, { useContext, useEffect } from "react";
import { LineChart, PieChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { DashboardContext } from "../context/DashboardContext";
import styles from "./styles/index.scss";
import { Loading } from "@carbon/react";
import ChartWrapperComponent from "./components/chart-wrapper.component";

const UnderCommunityCare = () => {
  const options = {
    title: "Under Care of Community Programmes",
    resizable: true,
    height: "400px",
  };

  const {
    chartData: { underCareOfCommunityProgram, allClients },
  } = useContext(DashboardContext);

  const formatData = () => {
    return [
      {
        group: "Not under care",
        value:
          allClients?.raw?.results?.length -
          underCareOfCommunityProgram?.raw?.results?.length,
      },
      {
        group: "Under care",
        value: underCareOfCommunityProgram?.raw?.results?.length,
      },
    ];
  };

  useEffect(() => {
    formatData();
  }, []);

  return (
    <div className={styles.chartContainer}>
      {underCareOfCommunityProgram.loading ? (
        <Loading className={styles.spinner} withOverlay={false} />
      ) : (
        <ChartWrapperComponent
          data={formatData()}
          chartName="underCareOfCommunityProgram"
        >
          <PieChart data={formatData()} options={options}></PieChart>
        </ChartWrapperComponent>
      )}
    </div>
  );
};

export default UnderCommunityCare;
