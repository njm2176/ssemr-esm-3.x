import React, { useContext } from "react";
import styles from "./index.scss";
import { RadioButton, RadioButtonGroup } from "@carbon/react";
import { DashboardContext } from "../../context/DashboardContext";
import MonthlyPickerComponent from "./monthly-picker.component";
import WeeklyPickerComponent from "./weekly-picker.component";

const groupingOptions = ["monthly", "weekly"];

const CascadePickerComponent = () => {
  const { setViralLoadRange } = useContext(DashboardContext);

  const [grouping, setGrouping] = React.useState("monthly");

  const changeCallback = (range) => {
    setViralLoadRange(range);
  };

  return (
    <div className={styles.cascadePicker}>
      <div className={styles.cascadeRadios}>
        <RadioButtonGroup
          className={styles.cacadeRadios}
          size="sm"
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

      {grouping === "monthly" ? (
        <MonthlyPickerComponent changeCallback={changeCallback} />
      ) : (
        <WeeklyPickerComponent changeCallback={changeCallback} />
      )}
    </div>
  );
};

export default CascadePickerComponent;
