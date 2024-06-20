import React from "react";
import styles from "./index.scss";

const ChartWrapperComponent = ({
  children,
  data,
  chartName,
  currentTimeFilter = null,
}) => {
  return (
    <div>
      {data.length > 0 &&
      (currentTimeFilter ? data[0][currentTimeFilter] : true) ? (
        children
      ) : (
        <div className={styles.noRecords}>
          <p className={styles.noRecordsTitle}>{chartName}</p>
          <p className={styles.noRecordsText}>No records</p>
        </div>
      )}
    </div>
  );
};

export default ChartWrapperComponent;
