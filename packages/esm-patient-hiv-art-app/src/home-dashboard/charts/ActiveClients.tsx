import React, { useContext, useEffect } from "react";
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { DashboardContext } from "../context/DashboardContext";

const ActiveClients = () => {
  const {
    chartData: { activeClients, allClients },
  } = useContext(DashboardContext);

  const formatData = () => {
    return [
      {
        group: "Inactive",
        value:
          allClients?.raw?.results?.length -
          activeClients?.raw?.results?.length,
      },
      {
        group: "Active",
        value: activeClients?.raw?.results?.length,
      },
    ];
  };

  useEffect(() => {
    formatData();
  }, []);

  const options = {
    title: "Active Clients",
    resizable: true,
    height: "400px",
  };
  return <PieChart data={formatData()} options={options}></PieChart>;
};

export default ActiveClients;
