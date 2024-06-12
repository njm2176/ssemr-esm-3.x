import React, { useContext, useEffect, useState } from "react";
import styles from "./index.scss";
import { RadioButton, RadioButtonGroup, Select } from "@carbon/react";
import QuarterPickerComponent from "./quarter-picker.component";
import BiannualPickerComponent from "./biannual-picker.component";
import { DashboardContext } from "../../context/DashboardContext";
import AnnualPickerComponent from "./annual-picker.component";

const groupingOptions = ["annually", "biannually", "quarterly"];

const CascadePickerComponent = () => {
  const { setViralLoadRange } = useContext(DashboardContext);

  const [grouping, setGrouping] = React.useState("annually");

  const changeCallback = (range) => {
    setViralLoadRange(range);
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
        <AnnualPickerComponent changeCallback={changeCallback} />
      ) : (
        <BiannualPickerComponent changeCallback={changeCallback} />
      )}
    </div>
  );
};

export default CascadePickerComponent;
