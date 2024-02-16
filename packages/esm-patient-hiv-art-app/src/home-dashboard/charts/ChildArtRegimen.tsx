import React from "react";
import { childART } from "../dummy/data";
import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts-react/styles.css";
import { ScaleTypes } from "../types";

const ChildArtRegimen = () => {
  const options = {
    title: "CHild ART Regiment Treatment",
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

  return <SimpleBarChart data={childART} options={options}></SimpleBarChart>;
};

export default ChildArtRegimen;
