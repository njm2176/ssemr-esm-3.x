import React, { useContext, useEffect } from "react";
import { useARTCharts } from "../../hooks/useARTCharts";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";
import { DashboardContext } from "../../context/DashboardContext";

const ComplexCharts = () => {
  const { waterfallConfig } = useARTCharts();
  const { memoizedWaterFallData, waterFallDateRange } =
    useContext(DashboardContext);

  useEffect(() => {
    memoizedWaterFallData();
  }, [waterFallDateRange]);

  return (
    <HivArtChartsLayoutComponent
      config={waterfallConfig}
      styleKey="waterfall"
    />
  );
};

export default ComplexCharts;
