import React, { useEffect, useState } from "react";
import styles from "./index.scss";
import { getMonthStartAndLastDate } from "../../helpers/dateOps";

const QuarterPickerComponent = ({ changeCallback }) => {
  const [month, setMonth] = useState("");

  const monthChangeHandler = (value) => {
    const range = getMonthStartAndLastDate(value);
    changeCallback({ start: range.startDate, end: range.endDate });
    setMonth(value);
  };

  // useEffect(() => {
  //   changeCallback(dateRange);
  // }, [dateRange]);

  return (
    <div className={styles.quarterPickerParent}>
      <div className={styles.formGroup}>
        <label htmlFor="month">Month</label>
        <input
          id="month"
          className={styles.timeInputs}
          value={month}
          type="month"
          onChange={(evt) => monthChangeHandler(evt.target.value)}
        />
      </div>
    </div>
  );
};

export default QuarterPickerComponent;
