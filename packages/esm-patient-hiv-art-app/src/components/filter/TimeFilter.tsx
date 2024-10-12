import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { DatePicker, DatePickerInput } from "@carbon/react";

export const TimeFilter = () => {
  const { setTime } = useContext(DashboardContext);

  const [dateRangeValue, setDateRangeValue] = useState([
    new Date(new Date().getFullYear(), 0, 1),
    new Date(new Date().getFullYear(), 11, 31),
  ]);

  const changeHandler = (range: Date[]) => {
    setDateRangeValue(range);
  };

  const adjustToOffset = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset);
  };

  useEffect(() => {
    if (dateRangeValue[0] && dateRangeValue[1])
      setTime({
        startDate: adjustToOffset(dateRangeValue[0])
          .toISOString()
          .split("T")[0],
        endDate: adjustToOffset(dateRangeValue[1]).toISOString().split("T")[0],
      });
  }, [dateRangeValue]);

  return (
    <div>
      <DatePicker
        value={dateRangeValue}
        onChange={changeHandler}
        datePickerType="range"
      >
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    </div>
  );
};
