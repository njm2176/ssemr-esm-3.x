import React, { useContext, useEffect, useState } from "react";
import { RadioButton, RadioButtonGroup, Select } from "@carbon/react";
import styles from "./index.scss";
import { DashboardContext } from "../../context/DashboardContext";
import {
  getMonthStartAndLastDate,
  getStartAndEndDateOfWeek,
  getThisYearsFirstAndLastDate,
} from "../../helpers/dateOps";

export const TimeFilter = () => {
  const [yearOptions, setYearOptions] = useState([]);
  const [timeFilter, setTimeFilter] = useState("groupYear");
  const [selectedYear, setSelectedYear] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const { setCurrentTimeFilter, setTime } = useContext(DashboardContext);

  const filterChangeHandler = (value) => {
    if (value === "groupYear")
      setTime(getThisYearsFirstAndLastDate(new Date().getFullYear()));
    else if (value === "groupMonth")
      setTime(getMonthStartAndLastDate(`${new Date().getFullYear()}-01`));
    else setTime(getStartAndEndDateOfWeek(`${new Date().getFullYear()}-W01`));

    setTimeFilter(value);
  };

  const weekChangeHandler = (value) => {
    setWeek(value);
    setTime(getStartAndEndDateOfWeek(value));
  };

  const monthChangeHandler = (value) => {
    setMonth(value);
    setTime(getMonthStartAndLastDate(value));
  };

  const yearChangeHandler = (value) => {
    setSelectedYear(value);
    setTime(getThisYearsFirstAndLastDate(value));
  };

  useEffect(() => {
    setCurrentTimeFilter(timeFilter);
  }, [timeFilter]);

  useEffect(() => {
    setMonth(`${selectedYear}-01`);
    setWeek(`${selectedYear}-W01`);
  }, [selectedYear]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const yearOptions = [];

    for (let year = currentYear; year >= currentYear - 19; year--) {
      setYearOptions((prev) => [
        ...prev,
        { value: year, label: year.toString() },
      ]);

      yearOptions.push({ value: year, label: year.toString() });
    }
  }, []);

  return (
    <div className={styles.parent}>
      <RadioButtonGroup
        legendText="Group data by"
        name="group-year"
        defaultSelected={timeFilter}
        orientation="horizontal"
        value={timeFilter}
        onChange={(value: React.SetStateAction<string>) =>
          filterChangeHandler(value)
        }
      >
        <RadioButton
          labelText="Year"
          value="groupYear"
          id="year"
          checked={timeFilter === "groupYear"}
        />
        <RadioButton labelText="Month" value="groupMonth" id="month" />
        <RadioButton labelText="Week" value="groupWeek" id="week" />
      </RadioButtonGroup>

      <div className={styles.inputWrapper}>
        {timeFilter === "groupYear" ? (
          <Select
            id="yearPicker"
            labelText="Year"
            value={selectedYear}
            onChange={(evt) => yearChangeHandler(evt.target.value)}
            defaultValue={yearOptions[0]}
          >
            {yearOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        ) : timeFilter === "groupMonth" ? (
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
        ) : (
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
        )}
      </div>
    </div>
  );
};
