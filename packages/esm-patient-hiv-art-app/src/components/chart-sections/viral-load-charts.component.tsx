import React, { useContext, useEffect } from "react";
import { useARTCharts } from "../../hooks/useARTCharts";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";
import { DashboardContext } from "../../context/DashboardContext";

const ViralLoadChartsComponent = () => {
  const { viralLoadChartsConfig } = useARTCharts();

  const {
    time,
    currentTimeFilter,
    memoizedVLChartRequests,
    viralLoadRange,
    memoizedHVLCascade,
  } = useContext(DashboardContext);

  useEffect(() => {
    memoizedVLChartRequests();
  }, [currentTimeFilter, time]);

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
