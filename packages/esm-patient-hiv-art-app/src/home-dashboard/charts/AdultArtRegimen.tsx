import React from "react";
import { adultART } from "../dummy/data";
import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { ScaleTypes } from "../types";

const AdultARTRegimen = () => {
  const options = {
    title: "Adult ART Regiment Treatment",
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

  return <SimpleBarChart data={adultART} options={options}></SimpleBarChart>;
};

export default AdultARTRegimen;
