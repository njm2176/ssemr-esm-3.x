import React, { useEffect } from "react";
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { activeClientData } from "../dummy/data";
import { useHomeDashboard } from "../hooks/useHomeDashboard";

const ActiveClients = () => {
  const { activeClients, getDummyData, allClients } = useHomeDashboard();

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
