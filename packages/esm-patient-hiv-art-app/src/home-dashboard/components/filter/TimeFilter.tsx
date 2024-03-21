import React, { useEffect, useState } from "react";
import { RadioButton, RadioButtonGroup, Select } from "@carbon/react";
import styles from "./index.scss";

export const TimeFilter = () => {
  const [yearOptions, setYearOptions] = useState([]);
  const [timeFilter, setTimeFilter] = useState("year");
  const [selectedYear, setSelectedYear] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");

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
        name="radio-button-group"
        defaultSelected="radio-1"
        orientation="horizontal"
        value={timeFilter}
        onChange={(value: React.SetStateAction<string>) => setTimeFilter(value)}
      >
        <RadioButton labelText="Year" value="year" id="year" />
        <RadioButton labelText="Month" value="month" id="month" />
        <RadioButton labelText="Week" value="week" id="week" />
      </RadioButtonGroup>

      <div className={styles.inputWrapper}>
        {timeFilter === "year" ? (
          <Select
            id="yearPicker"
            labelText="Year"
            value={selectedYear}
            onChange={(evt: {
              target: { value: React.SetStateAction<string> };
            }) => setSelectedYear(evt.target.value)}
            defaultValue={yearOptions[0]}
          >
            {yearOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        ) : timeFilter === "month" ? (
          <input
            value={month}
            type="month"
            onChange={(evt) => setMonth(evt.target.value)}
          />
        ) : (
          <input
            value={week}
            type="week"
            onChange={(evt) => setWeek(evt.target.value)}
          />
        )}
      </div>
    </div>
  );
};
