import React from "react";
import { highViralLoad } from "../dummy/data";
import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { ScaleTypes } from "../types";

const HighViralLoadCascade = () => {
  const options = {
    title: "HighViral Load Cascade",
    axes: {
      left: {
        mapsTo: "value",
      },
      bottom: {
        mapsTo: "group",
        scaleType: "labels" as ScaleTypes,
      },
    },
    height: "400px",
  };

  return (
    <SimpleBarChart data={highViralLoad} options={options}></SimpleBarChart>
  );
};

export default HighViralLoadCascade;
