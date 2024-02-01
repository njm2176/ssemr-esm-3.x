import React, { useEffect } from "react";
import { newlyEnrolledData } from "../dummy/data";
import { AreaChart } from "@carbon/charts";
import "@carbon/charts/styles.css";
import "./index.scss";

const NewlyEnrolled = () => {
  const createChart = () => {
    const chartHolder = document.getElementById("holder");

    new AreaChart(chartHolder, {
      data: newlyEnrolledData.data,
      options: newlyEnrolledData.options,
    });
  };

  useEffect(() => {
    createChart();
  }, []);

  return <div className="" id="holder"></div>;
};

export default NewlyEnrolled;
