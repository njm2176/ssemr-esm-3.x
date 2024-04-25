import React, { useContext, useEffect } from "react";
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { DashboardContext } from "../context/DashboardContext";

const ViralLoadCoverage = () => {
  const options = {
    title: "Viral load coverage",
    resizable: true,
    height: "400px",
  };

  const {
    chartData: { viralLoadCoverage, allClients },
  } = useContext(DashboardContext);

  const formatData = () => {
    return [
      {
        group: "Not covered",
        value:
          allClients?.raw?.results?.length -
          viralLoadCoverage?.raw?.results?.length,
      },
      {
        group: "Covered",
        value: viralLoadCoverage?.raw?.results?.length,
      },
    ];
  };

  useEffect(() => {
    formatData();
  }, []);

  return <PieChart data={formatData()} options={options}></PieChart>;
};

export default ViralLoadCoverage;
