import React, { useEffect, useState } from "react";
import styles from "./index.scss";
import { Select } from "@carbon/react";
import QuarterPickerComponent from "./quarter-picker.component";
import BiannualPickerComponent from "./biannual-picker.component";

const groupingOptions = ["annually", "biannually", "quarterly"];

const CascadePickerComponent = ({ timeFilter, filterChangeHandler }) => {
  const [grouping, setGrouping] = React.useState(["annual"]);
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
    <div className={styles.parent}>
      <Select
        id="grouping"
        noLabel={true}
        value={grouping}
        onChange={(evt) => setGrouping(evt.target.value)}
        defaultValue={grouping}
      >
        {groupingOptions.map((option, index) => (
          <option key={index} value={option}>
            {option === "quarterly" ? (
              <QuarterPickerComponent changeCallback={changeCallback} />
            ) : option === "annually" ? (
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
          </option>
        ))}
      </Select>
    </div>
  );
};

export default CascadePickerComponent;
