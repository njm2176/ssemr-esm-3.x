import React, { useContext, useEffect, useState } from "react";
import { useCharts } from "../../hooks/useCharts";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";
import { DashboardContext } from "../../context/DashboardContext";
import { StackedBarChart } from "@carbon/charts-react";
import { mockData } from "./stacked-bar/mockData";
import { mockOptions } from "./stacked-bar/mockOptions";
import { mockTimeSeriesData } from "./stacked-bar/mockTimeSeriesData";

import { DatePicker, DatePickerInput } from "@carbon/react";
import "@carbon/charts-react/styles.css";

const getInitialMockRange = () => {
  const startDate = new Date('2025-01-01');
  const endDate = new Date('2025-03-31');
  return [startDate, endDate];
};

const ViralLoadChartsComponent = () => {
  const { viralLoadChartsConfig } = useCharts();

  const {
    time,
    memoizedVLChartRequests,
    viralLoadRange,
    memoizedHVLCascade,
    categoryFilter,
  } = useContext(DashboardContext);

  useEffect(() => {
    memoizedVLChartRequests();
  }, [categoryFilter, time]);

  useEffect(() => {
    memoizedHVLCascade();
  }, [viralLoadRange]);

  const [filteredData, setFilteredData] = useState([]);
  const [localDateRange, setLocalDateRange] = useState(getInitialMockRange());
  
  useEffect(() => {
    if (localDateRange && localDateRange.length === 2 && localDateRange[0] && localDateRange[1]) {
      const [startDate, endDate] = localDateRange;

      const dataForChart = mockTimeSeriesData.filter(item => {
        if (!item.key || isNaN(new Date(item.key).getTime())) {
          return false;
        }
        const itemDate = new Date(item.key);
        return itemDate >= startDate && itemDate <= endDate;
      });

      setFilteredData(dataForChart);
    } else {
      setFilteredData([]);
    }
  }, [localDateRange]);

  return (
<>
      <HivArtChartsLayoutComponent
        config={viralLoadChartsConfig}
        styleKey="viral-load"
      />
      <div style={{ padding: "2rem", marginTop: "2rem" }}>
        <h3>EAC Trend by Date Range</h3>
        <div style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
          <DatePicker
            datePickerType="range"
            value={localDateRange}
            onChange={(newRange) => setLocalDateRange(newRange)}
            dateFormat="Y-m-d"
          >
            <DatePickerInput
              id="date-picker-start"
              placeholder="YYYY-MM-DD"
              labelText="Start date"
            />
            <DatePickerInput
              id="date-picker-end"
              placeholder="YYYY-MM-DD"
              labelText="End date"
            />
          </DatePicker>
        </div>
        
        {filteredData.length > 0 ? (
          <StackedBarChart data={filteredData} options={mockOptions} />
        ) : (
          <div>No data available for the selected range...</div>
        )}
      </div>
      
    </>
  );
};

export default ViralLoadChartsComponent;
