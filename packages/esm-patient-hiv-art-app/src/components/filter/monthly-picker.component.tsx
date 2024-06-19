import React, { useState } from "react";
import styles from "./index.scss";
import { getMonthStartAndLastDate } from "../../helpers/dateOps";

const MonthlyPickerComponent = ({ changeCallback }) => {
  const [month, setMonth] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 < 9
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1
    }`
  );

  const monthChangeHandler = (value) => {
    const range = getMonthStartAndLastDate(value);
    changeCallback({ start: range.startDate, end: range.endDate });
    setMonth(value);
  };

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

export default MonthlyPickerComponent;
