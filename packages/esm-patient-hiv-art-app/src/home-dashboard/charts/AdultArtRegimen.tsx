import React from "react";
import { adultART } from "../dummy/data";
import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";

const AdultARTRegimen = () => {
  const options = {
    title: "Adult ART Regiment Treatment",
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

  return <SimpleBarChart data={adultART} options={options}></SimpleBarChart>;
};

export default AdultARTRegimen;
