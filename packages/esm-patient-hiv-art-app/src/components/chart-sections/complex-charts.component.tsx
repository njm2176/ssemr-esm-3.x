import React from "react";
import { useARTCharts } from "../../hooks/useARTCharts";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";

const ComplexCharts = () => {
  const { waterfallConfig } = useARTCharts();
  return <HivArtChartsLayoutComponent config={waterfallConfig} styleKey="waterfall" />;
};

export default ComplexCharts;
