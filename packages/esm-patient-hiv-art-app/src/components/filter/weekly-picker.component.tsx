import React, { useState } from "react";
import styles from "./index.scss";
import { getStartAndEndDateOfWeek } from "../../helpers/dateOps";

const WeeklyPickerComponent = ({ changeCallback }) => {
  const [week, setWeek] = useState("");

  const weekChangeHandler = (value) => {
    const range = getStartAndEndDateOfWeek(value);
    changeCallback({ start: range.startDate, end: range.endDate });
    setWeek(value);
  };

  return (
    <div className={styles.quarterPickerParent}>
      <div className={styles.formGroup}>
        <label htmlFor="week">Week</label>
        <input
          id="week"
          className={styles.timeInputs}
          value={week}
          type="week"
          onChange={(evt) => weekChangeHandler(evt.target.value)}
        />
      </div>
    </div>
  );
};

export default WeeklyPickerComponent;
