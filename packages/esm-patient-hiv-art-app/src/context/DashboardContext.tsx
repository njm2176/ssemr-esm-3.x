import React, { createContext, useCallback, useEffect } from "react";
import { useChartData } from "../hooks/useChartData";
import { chartRequestConfig } from "../helpers/chartRequestConfig";

export const DashboardContext = createContext(null);

const DashboardProvider = ({ children }) => {
  const {
    chartData,
    time,
    setTime,
    categoryFilter,
    getChartDatav2,
    setCategoryFilter,
    getActiveClients,
    getAllClients,
    getNewlyEnrolledClients,
    getClientsOnAppointment,
    getMissedAppointments,
    getInterruptedTreatment,
    getReturnedToTreatment,
    getDueForViralLoad,
    getViralLoadResults,
    getViralLoadSamples,
    getHighViralLoad,
    getAdultART,
    getChildART,
    stats,
    getUnderCareOfCommunityProgram,
    getViralLoadCoverage,
    getViralLoadSuppression,
    getHighViralLoadCascade,
    setWaterFallDateRange,
    waterFallDateRange,
    viralLoadRange,
    setViralLoadRange,
    getWaterFallData,
    defaultStatHeaders,
    txCURRHeaders,
  } = useChartData();

  console.log("chart data", chartData);

  const memoizedGenericChartRequests = useCallback(async () => {
    try {

      getChartDatav2({
        ...chartRequestConfig.adultART,
        url: chartRequestConfig.adultART.url({
          time,
        }),
      });

      getChartDatav2({
        ...chartRequestConfig.childART,
        url: chartRequestConfig.childART.url({
          time,
        }),
      });

      getChartDatav2({
        ...chartRequestConfig.underCareOfCommunityProgram,
        url: chartRequestConfig.underCareOfCommunityProgram.url({
          time,
        }),
      });
    } catch (e) {
      return e;
    }
  }, [time, categoryFilter]);

  const memoizedVLChartRequests = useCallback(async () => {
    try {
      getChartDatav2({
        ...chartRequestConfig.viralLoadSamples,
        url: chartRequestConfig.viralLoadSamples.url({
          time,
        }),
      });

      getChartDatav2({
        ...chartRequestConfig.viralLoadResults,
        url: chartRequestConfig.viralLoadResults.url({
          time,
        }),
      });

      getChartDatav2({
        ...chartRequestConfig.viralLoadCoverage,
        url: chartRequestConfig.viralLoadCoverage.url({
          time,
        }),
      });

      getChartDatav2({
        ...chartRequestConfig.viralLoadSuppression,
        url: chartRequestConfig.viralLoadSuppression.url({
          time,
        }),
      });
    } catch (e) {
      return e;
    }
  }, [time, categoryFilter]);

  const memoizedHVLCascade = useCallback(() => {
    try {
      getChartDatav2({
        ...chartRequestConfig.highViralLoadCascade,
        url: chartRequestConfig.highViralLoadCascade.url({
          time: viralLoadRange,
        }),
      });
    } catch (e) {
      return e;
    }
  }, [viralLoadRange]);

  const memoizedWaterFallData = useCallback(() => {
    try {
      getChartDatav2({
        ...chartRequestConfig.waterfall,
        url: chartRequestConfig.waterfall.url({
          time: waterFallDateRange,
        }),
      });
    } catch (e) {
      return e;
    }
  }, [waterFallDateRange]);

  const memoizedInitialBatchOfData = useCallback(async () => {
    try {
      getChartDatav2({
        ...chartRequestConfig.newlyEnrolledClients,
        url: chartRequestConfig.newlyEnrolledClients.url({
          time,
          categoryFilter,
        }),
      });

      getChartDatav2({
        ...chartRequestConfig.activeClients,
        url: chartRequestConfig.activeClients.url({
          time,
          categoryFilter,
        }),
      });

      getChartDatav2({
        ...chartRequestConfig.allClients,
        url: chartRequestConfig.allClients.url({
          time,
        }),
      });
      getChartDatav2({
        ...chartRequestConfig.onAppointment,
        url: chartRequestConfig.onAppointment.url({
          time,
          categoryFilter,
        }),
      });

      getChartDatav2({
        ...chartRequestConfig.missedAppointment,
        url: chartRequestConfig.missedAppointment.url({
          time,
          categoryFilter,
        }),
      });
      getChartDatav2({
        ...chartRequestConfig.interrupted,
        url: chartRequestConfig.interrupted.url({
          time,
          categoryFilter,
        }),
      });
      getChartDatav2({
        ...chartRequestConfig.returned,
        url: chartRequestConfig.returned.url({
          time,
          categoryFilter,
        }),
      });
      getChartDatav2({
        ...chartRequestConfig.dueForViralLoad,
        url: chartRequestConfig.dueForViralLoad.url({
          time,
          categoryFilter,
        }),
      });
      getChartDatav2({
        ...chartRequestConfig.highViralLoad,
        url: chartRequestConfig.highViralLoad.url({
          time,
          categoryFilter,
        }),
      });
    } catch (e) {
      return e;
    }
  }, [time]);

  useEffect(() => {
    memoizedInitialBatchOfData();
  }, [time]);

  return (
    <DashboardContext.Provider
      value={{
        chartData,
        setCategoryFilter,
        categoryFilter,
        stats,
        time,
        setTime,
        setWaterFallDateRange,
        setViralLoadRange,
        defaultStatHeaders,
        txCURRHeaders,
        //   http requests
        getNewlyEnrolledClients,
        getActiveClients,
        getAdultART,
        getChildART,
        getAllClients,
        getUnderCareOfCommunityProgram,
        getDueForViralLoad,
        getViralLoadSamples,
        getViralLoadResults,
        getViralLoadCoverage,
        getViralLoadSuppression,
        getHighViralLoad,
        getClientsOnAppointment,
        getMissedAppointments,
        getReturnedToTreatment,
        getInterruptedTreatment,
        memoizedGenericChartRequests,
        memoizedVLChartRequests,
        viralLoadRange,
        memoizedHVLCascade,
        memoizedWaterFallData,
        waterFallDateRange,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardProvider;
