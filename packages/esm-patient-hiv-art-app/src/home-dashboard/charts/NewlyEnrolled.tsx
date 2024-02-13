import React, { useContext, useEffect } from "react";
import { newlyEnrolledData } from "../dummy/data";
import { AreaChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import "./index.scss";
import { DashboardContext } from "../context/DashboardContext";

const NewlyEnrolled = () => {
  const { newlyEnrolledClients } = useContext(DashboardContext);

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
