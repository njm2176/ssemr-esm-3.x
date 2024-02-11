import React, { useEffect } from "react";
import { currentARTClients } from "../dummy/data";
import { AreaChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import "./index.scss";

const NewlyEnrolled = () => {
  return (
    <div className="">
      <AreaChart
        data={currentARTClients.data}
        options={currentARTClients.options}
      />
    </div>
  );
};

export default NewlyEnrolled;
