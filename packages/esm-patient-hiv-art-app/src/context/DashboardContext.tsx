import React, { createContext, useCallback, useEffect } from "react";
import { useChartData } from "../hooks/useChartData";

export const DashboardContext = createContext(null);

const DashboardProvider = ({ children }) => {
  const {
    chartData,
    setCurrentTimeFilter,
    currentTimeFilter,
    time,
    setTime,
    currentTopFilterIndex,
    setCurrentTopFilterIndex,
    filters,
    setFilters,
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
    filterTabs,
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
  }, [currentTimeFilter, time]);

  const memoizedVLChartRequests = useCallback(async () => {
    try {
      getViralLoadSamples();
      getViralLoadResults();
      getViralLoadCoverage();
      getViralLoadSuppression();
    } catch (e) {
      return e;
    }
  }, [currentTimeFilter, time]);

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
  }, [currentTimeFilter, time]);

  useEffect(() => {
    memoizedInitialBatchOfData();
  }, [currentTimeFilter, time]);

  return (
    <DashboardContext.Provider
      value={{
        currentTimeFilter,
        currentTopFilterIndex,
        filterTabs,
        filters,
        chartData,
        setCurrentTimeFilter,
        setCurrentTopFilterIndex,
        setFilters,
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
