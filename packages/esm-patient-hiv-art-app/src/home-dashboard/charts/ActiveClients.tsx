import React, { useContext, useEffect } from "react";
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { DashboardContext } from "../context/DashboardContext";

const ActiveClients = () => {
  const { activeClients, allClients } = useContext(DashboardContext);

  const formatData = () => {
    return [
      {
        group: "Inactive",
        value: allClients?.results?.length - activeClients?.results?.length,
      },
      {
        group: "Active",
        value: activeClients?.results?.length,
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
