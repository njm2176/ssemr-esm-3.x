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
      <QuarterPickerComponent changeCallback={handleChange} />
      <div className={styles.noRecords}>
        <p className={styles.noRecordsTitle}>FY23Q4 waterfall analysis</p>
        <p className={styles.noRecordsText}>No records</p>
      </div>
    </div>
  );
};

export default Waterfall;
