import React, { useContext, useEffect } from "react";
import { useCharts } from "../../hooks/useCharts";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";
import { DashboardContext } from "../../context/DashboardContext";
import { StackedBarChart } from "@carbon/charts-react";
import { mockData } from "./stacked-bar/mockData";
import { mockOptions } from "./stacked-bar/mockOptions";

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

  return (
<>
      <HivArtChartsLayoutComponent
        config={viralLoadChartsConfig}
        styleKey="viral-load"
      />
      <div style={{ padding: "2rem" }}>
        <StackedBarChart data={mockData} options={mockOptions} />
      </div>
    </>
  );
};

export default ViralLoadChartsComponent;
