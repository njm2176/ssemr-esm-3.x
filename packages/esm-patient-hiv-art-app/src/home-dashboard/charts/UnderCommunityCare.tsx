import React, { useContext, useEffect } from "react";
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { DashboardContext } from "../context/DashboardContext";

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
        group: "Inactive",
        value:
          allClients?.raw?.results?.length -
          underCareOfCommunityProgram?.raw?.results?.length,
      },
      {
        group: "Active",
        value: underCareOfCommunityProgram?.raw?.results?.length,
      },
    ];
  };

  useEffect(() => {
    formatData();
  }, []);

  return <PieChart data={formatData()} options={options}></PieChart>;
};

export default UnderCommunityCare;
