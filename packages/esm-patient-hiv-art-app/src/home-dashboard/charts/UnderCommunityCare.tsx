import React from "react";
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { activeClientData } from "../dummy/data";

const UnderCommunityCare = () => {
  const options = {
    title: "Under Care of Community Programmes",
    resizable: true,
    height: "400px",
  };
  return <PieChart data={activeClientData} options={options}></PieChart>;
};

export default UnderCommunityCare;
