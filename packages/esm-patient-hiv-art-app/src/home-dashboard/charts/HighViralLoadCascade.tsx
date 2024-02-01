import React from "react";
import { highViralLoad } from "../dummy/data";
import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";

const HighViralLoadCascade = () => {
  const options = {
    title: "HighViral Load Cascade",
    axes: {
      left: {
        mapsTo: "value",
      },
      bottom: {
        mapsTo: "group",
        scaleType: "labels",
      },
    },
    height: "400px",
  };

  return (
    <SimpleBarChart data={highViralLoad} options={options}></SimpleBarChart>
  );
};

export default HighViralLoadCascade;
