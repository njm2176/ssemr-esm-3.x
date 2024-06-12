import React, { useEffect, useState } from "react";
import styles from "./index.scss";
import { RadioButton, RadioButtonGroup, Select } from "@carbon/react";
import QuarterPickerComponent from "./quarter-picker.component";
import BiannualPickerComponent from "./biannual-picker.component";

const groupingOptions = ["annually", "biannually", "quarterly"];

const CascadePickerComponent = ({ filterChangeHandler }) => {
  const [grouping, setGrouping] = React.useState("annually");
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

  const changeCallback = (range) => {
    console.log("log", range);
  };

  return (
    <div className={styles.cascadePicker}>
      <div className={styles.cascadeRadios}>
        <RadioButtonGroup
          className={styles.cacadeRadios}
          size="sm"
          legendText="Group data ..."
          name="group-year"
          defaultSelected={grouping}
          selected={grouping}
          orientation="horizontal"
          value={grouping}
          onChange={(value: React.SetStateAction<string>) => setGrouping(value)}
        >
          {groupingOptions.map((option) => (
            <RadioButton
              checked={option == grouping}
              labelText={option}
              value={option}
              id={option}
              key={option}
            />
          ))}
        </RadioButtonGroup>
      </div>

      {grouping === "quarterly" ? (
        <QuarterPickerComponent changeCallback={changeCallback} />
      ) : grouping === "annually" ? (
        <Select
          id="yearPicker"
          labelText="Year"
          value={yearOptions.at(-1)}
          defaultValue={yearOptions[0]}
          onChange={changeCallback}
        >
          {yearOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <BiannualPickerComponent changeCallback={changeCallback} />
      )}
    </div>
  );
};

export default CascadePickerComponent;
