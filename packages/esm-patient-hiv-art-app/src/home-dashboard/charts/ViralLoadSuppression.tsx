import React, { useContext, useEffect } from "react";
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { DashboardContext } from "../context/DashboardContext";

const ViralLoadSuppression = () => {
  const options = {
    title: "Viral load suppression",
    resizable: true,
    height: "400px",
  };

  const {
    chartData: { viralLoadSuppression, viralLoadCoverage },
  } = useContext(DashboardContext);

  const formatData = () => {
    return [
      {
        group: "Unsuppressed",
        value:
          viralLoadCoverage?.raw?.results?.length -
          viralLoadSuppression?.raw?.results?.length,
      },
      {
        group: "Suppressed",
        value: viralLoadSuppression?.raw?.results?.length,
      },
    ];
  };

  useEffect(() => {
    formatData();
  }, []);

  return <PieChart data={formatData()} options={options}></PieChart>;
};

export default ViralLoadSuppression;
