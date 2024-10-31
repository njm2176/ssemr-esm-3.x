import React, { useContext, useEffect } from "react";
import { useARTCharts } from "../../hooks/useARTCharts";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";
import { DashboardContext } from "../../context/DashboardContext";

const ViralLoadChartsComponent = () => {
  const { viralLoadChartsConfig } = useARTCharts();

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
    <HivArtChartsLayoutComponent
      config={viralLoadChartsConfig}
      styleKey="viral-load"
    />
  );
};

export default ViralLoadChartsComponent;
