import React, { useEffect, useState } from "react";
import styles from "./index.scss";
import { Select } from "@carbon/react";
import { date } from "zod";

const BiannualPickerComponent = ({ changeCallback }) => {
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
  const [half, setHalf] = React.useState(1);
  const [dateRange, setDateRange] = React.useState<{
    start: string;
    end: string;
  }>({
    start: "",
    end: "",
  });
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= currentYear - 19; year--) {
      setYearOptions((prev) => [
        ...prev,
        { value: year, label: year.toString() },
      ]);
    }
    updateDateRange(new Date().getFullYear(), "1");
  }, []);

  const handleYearChange = (e) => {
    setYear(e.target.value);
    updateDateRange(e.target.value, String(half));
  };

  const handleBiannualChange = (e) => {
    setHalf(e.target.value);
    updateDateRange(year, e.target.value);
  };

  const updateDateRange = (year: number, quarter: string) => {
    let startDate, endDate;
    switch (parseInt(quarter)) {
      case 1:
        startDate = `${year}-01-01`;
        endDate = `${year}-06-30`;
        break;
      case 2:
        startDate = `${year}-07-01`;
        endDate = `${year}-12-31`;
        break;
      default:
        startDate = "";
        endDate = "";
    }
    setDateRange({ start: startDate, end: endDate });
  };

  const biannualOptions = [
    {
      id: "b1",
      text: "January 1 - June 30",
      value: 1,
    },
    {
      id: "b2",
      text: "July 1 - December 31",
      value: 2,
    },
  ];

  useEffect(() => {
    changeCallback(dateRange);
  }, [dateRange]);

  return (
    <div className={styles.quarterPickerParent}>
      <Select
        size="sm"
        id="yearPicker"
        placeholder="Year"
        noLabel={true}
        value={year}
        onChange={(evt) => handleYearChange(evt)}
        defaultValue={yearOptions[0]}
      >
        {yearOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <Select
        size="sm"
        noLabel={true}
        id="biannualPicker"
        value={half}
        onChange={(evt) => handleBiannualChange(evt)}
        defaultValue={biannualOptions[0]}
      >
        {biannualOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default BiannualPickerComponent;
