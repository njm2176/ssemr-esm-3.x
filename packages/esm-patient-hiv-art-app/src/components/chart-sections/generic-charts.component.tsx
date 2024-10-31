import React, { useContext, useEffect } from "react";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";
import { useARTCharts } from "../../hooks/useARTCharts";
import { DashboardContext } from "../../context/DashboardContext";

const GenericCharts = () => {
  const { genericChartsConfig } = useARTCharts();

  const { time, categoryFilter, memoizedGenericChartRequests } =
    useContext(DashboardContext);

  useEffect(() => {
    memoizedGenericChartRequests();
  }, [categoryFilter, time]);

  return (
    <HivArtChartsLayoutComponent
      config={genericChartsConfig}
      styleKey="generic"
    />
  );
};

export default GenericCharts;
