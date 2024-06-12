import React, { useEffect, useState } from "react";
import styles from "./index.scss";
import { Select } from "@carbon/react";
import { date } from "zod";

const QuarterPickerComponent = ({ changeCallback }) => {
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
  const [quarter, setQuarter] = React.useState(1);
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
    updateDateRange(e.target.value, String(quarter));
  };

  const handleQuarterChange = (e) => {
    setQuarter(e.target.value);
    updateDateRange(year, e.target.value);
  };

  const updateDateRange = (year: number, quarter: string) => {
    let startDate, endDate;
    switch (parseInt(quarter)) {
      case 1:
        startDate = `${year}-01-01`;
        endDate = `${year}-03-31`;
        break;
      case 2:
        startDate = `${year}-04-01`;
        endDate = `${year}-06-30`;
        break;
      case 3:
        startDate = `${year}-07-01`;
        endDate = `${year}-09-30`;
        break;
      case 4:
        startDate = `${year}-10-01`;
        endDate = `${year}-12-31`;
        break;
      default:
        startDate = "";
        endDate = "";
    }
    setDateRange({ start: startDate, end: endDate });
  };

  const quarterOptions = [
    {
      id: "q1",
      text: "January 1 - March 31",
      value: 1,
    },
    {
      id: "q2",
      text: "April 1 - June 30",
      value: 2,
    },
    {
      id: "q3",
      text: "July 1 - September 30",
      value: 3,
    },
    {
      id: "q4",
      text: "October 1 - December 31",
      value: 4,
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
        id="quarterPicker"
        value={quarter}
        onChange={(evt) => handleQuarterChange(evt)}
        defaultValue={quarterOptions[0]}
      >
        {quarterOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default QuarterPickerComponent;
