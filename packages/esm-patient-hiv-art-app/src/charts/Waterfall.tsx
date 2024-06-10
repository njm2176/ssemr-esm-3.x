import React from "react";
import "@carbon/charts/styles.css";
import { ScaleTypes } from "../types";
import styles from "./styles/index.scss";

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
        scaleType: "labels" as ScaleTypes,
      },
    },
    height: "400px",
  };

  return (
    <div className={styles.chartContainer}>
      {/*<SimpleBarChart*/}
      {/*  data={waterfallDummyData}*/}
      {/*  options={barOptions}*/}
      {/*></SimpleBarChart>*/}

      <div className={styles.noRecords}>
        <p className={styles.noRecordsTitle}>FY23Q4 waterfall analysis</p>
        <p className={styles.noRecordsText}>No records</p>
      </div>
    </div>
  );
};

export default Waterfall;
