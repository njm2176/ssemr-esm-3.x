import React from "react";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";
import { useARTCharts } from "../../hooks/useARTCharts";

const GenericCharts = () => {
  const { genericChartsConfig } = useARTCharts();
  return <HivArtChartsLayoutComponent config={genericChartsConfig} styleKey="generic" />;
};

export default GenericCharts;
