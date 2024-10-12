import React, { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";

export const TimeFilter = () => {
  const { setCurrentTimeFilter, setTime } = useContext(DashboardContext);
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const handleSelect = (ranges) => {
    console.log(ranges);
  };

  return (
    <div>

    </div>
  );
};
