import React from "react";
import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import { waterfallDummyData } from "../dummy/data";
import { ScaleTypes } from "../types";

const Waterfall = () => {
  const barOptions = {
    title: "FY23Q4 waterfall analysis",
    axes: {
      left: {
        mapsTo: "value",
        includeZero: false,
      },
      bottom: {
        mapsTo: "group",
        scaleType: "LABELS" as ScaleTypes,
      },
    },
    height: "400px",
  };

  return (
    <SimpleBarChart
      data={waterfallDummyData}
      options={barOptions}
    ></SimpleBarChart>
  );
};

export default Waterfall;
