import React from "react";
import { vlSamples } from "../dummy/data";
import { AreaChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import "./index.scss";

const ViralLoadSamples = () => {
  return (
    <div className="">
      <AreaChart data={vlSamples.data} options={vlSamples.options} />
    </div>
  );
};

export default ViralLoadSamples;
