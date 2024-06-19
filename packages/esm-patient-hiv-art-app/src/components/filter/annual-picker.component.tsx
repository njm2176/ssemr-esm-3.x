import React, { useEffect, useState } from "react";
import styles from "./index.scss";
import { Select } from "@carbon/react";

const AnnualPicker = ({ changeCallback }) => {
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
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
  }, []);

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setDateRange({
      start: `${e.target.value}-01-01`,
      end: `${e.target.value}-12-31`,
    });
  };

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
    </div>
  );
};

export default AnnualPicker;
