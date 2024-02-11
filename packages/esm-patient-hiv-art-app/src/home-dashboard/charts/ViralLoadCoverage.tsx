import React from "react";
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { viralLoadCoverage } from "../dummy/data";

const ViralLoadCoverage = () => {
  const options = {
    title: "Viral Load Coverage",
    resizable: true,
    height: "400px",
  };
  return <PieChart data={viralLoadCoverage} options={options}></PieChart>;
};

export default ViralLoadCoverage;
