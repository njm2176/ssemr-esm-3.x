import React from "react";
import { useARTCharts } from "../../hooks/useARTCharts";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";

const ViralLoadChartsComponent = () => {
  const { viralLoadChartsConfig } = useARTCharts();
  return <HivArtChartsLayoutComponent config={viralLoadChartsConfig} styleKey="viral-load" />;
};

export default ViralLoadChartsComponent;
