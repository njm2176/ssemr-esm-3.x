import React, { createContext, useCallback, useEffect } from "react";
import { useChartData } from "../hooks/useChartData";

export const DashboardContext = createContext(null);

const DashboardProvider = ({ children }) => {
  const {
    chartData,
    time,
    setTime,
    categoryFilter,
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
  const memoizedGenericChartRequests = useCallback(async () => {
    try {
      getNewlyEnrolledClients();
      getActiveClients();
      getAdultART();
      getChildART();
      getUnderCareOfCommunityProgram();
    } catch (e) {
      return e;
    }
  }, [time, categoryFilter]);

  const memoizedVLChartRequests = useCallback(async () => {
    try {
      getViralLoadSamples();
      getViralLoadResults();
      getViralLoadCoverage();
      getViralLoadSuppression();
    } catch (e) {
      return e;
    }
  }, [time, categoryFilter]);

  const memoizedHVLCascade = useCallback(async () => {
    try {
      await getHighViralLoadCascade();
    } catch (e) {
      return e;
    }
  }, [viralLoadRange]);

  const memoizedWaterFallData = useCallback(async () => {
    try {
      await getWaterFallData();
    } catch (e) {
      return e;
    }
  }, [waterFallDateRange]);

  const memoizedInitialBatchOfData = useCallback(async () => {
    try {
      getAllClients();
      getClientsOnAppointment();
      getMissedAppointments();
      getInterruptedTreatment();
      getReturnedToTreatment();
      //since it's used in stat card
      getDueForViralLoad();
      getHighViralLoad();
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
