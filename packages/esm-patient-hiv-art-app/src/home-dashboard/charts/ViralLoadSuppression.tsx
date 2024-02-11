import React from "react";
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { viralLoadSuppression } from "../dummy/data";

const ViralLoadSuppression = () => {
  const options = {
    title: "Viral Load Suppression",
    resizable: true,
    height: "400px",
  };
  return <PieChart data={viralLoadSuppression} options={options}></PieChart>;
};

export default ViralLoadSuppression;
