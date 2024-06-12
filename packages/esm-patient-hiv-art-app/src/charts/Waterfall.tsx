import React, { useContext } from "react";
import "@carbon/charts/styles.css";
import { ScaleTypes } from "../types";
import styles from "./styles/index.scss";
import QuarterPickerComponent from "../components/filter/quarter-picker.component";
import { DashboardContext } from "../context/DashboardContext";

const Waterfall = () => {
  const {
    chartData: { highViralLoadCascade },
    setWaterFallDateRange,
  } = useContext(DashboardContext);

  const handleChange = (dateRange: { start: string; end: string }) => {
    setWaterFallDateRange(dateRange);
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.waterfallHeaderContainer}>
        <p className="">Header</p>
        <div className={styles.waterfallFilterWrapper}>
          <QuarterPickerComponent changeCallback={handleChange} />
        </div>
      </div>

      <div className={styles.noRecords}>
        <p className={styles.noRecordsText}>No records</p>
      </div>
    </div>
  );
};

export default Waterfall;
