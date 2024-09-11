import React, { useContext, useEffect } from "react";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";
import { useARTCharts } from "../../hooks/useARTCharts";
import { DashboardContext } from "../../context/DashboardContext";

const GenericCharts = () => {
  const { genericChartsConfig } = useARTCharts();

  const {
    time,
    currentTimeFilter,
    memoizedGenericChartRequests,
    getNewlyEnrolledClients,
    getActiveClients,
    getAdultART,
    getChildART,
    getUnderCareOfCommunityProgram,
  } = useContext(DashboardContext);

  useEffect(() => {
    memoizedGenericChartRequests();
    // const fetchDataSequentially = async () => {
    //   try {
    //     await getNewlyEnrolledClients();
    //     await getActiveClients();
    //     await getAdultART();
    //     await getChildART();
    //     await getUnderCareOfCommunityProgram();
    //   } catch (e) {
    //     return e;
    //   }
    // };
    //
    // fetchDataSequentially();
  }, [currentTimeFilter, time]);

  return (
    <HivArtChartsLayoutComponent
      config={genericChartsConfig}
      styleKey="generic"
    />
  );
};

export default GenericCharts;
