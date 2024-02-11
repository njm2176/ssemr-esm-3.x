import React, { useEffect } from "react";
import { newlyEnrolledData } from "../dummy/data";
import { AreaChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import "./index.scss";

const NewlyEnrolled = () => {
  return (
    <div className="">
      <AreaChart
        data={newlyEnrolledData.data}
        options={newlyEnrolledData.options}
      />
    </div>
  );
};

export default NewlyEnrolled;
