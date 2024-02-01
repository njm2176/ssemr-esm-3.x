import React from "react";
import { vlDue } from "../dummy/data";
import { AreaChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import "./index.scss";

const DueForViralLoad = () => {
  return (
    <div className="">
      <AreaChart data={vlDue.data} options={vlDue.options} />
    </div>
  );
};

export default DueForViralLoad;
