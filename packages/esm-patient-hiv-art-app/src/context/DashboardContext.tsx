import React, { createContext, useEffect } from "react";
import activeClients from "../charts/ActiveClients";
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
  } = useChartData();

  useEffect(() => {
    getHighViralLoad();
    getDueForViralLoad();
    getNewlyEnrolledClients();
    getClientsOnAppointment();
    getActiveClients();
    getMissedAppointments();
    getAllClients();
    getReturnedToTreatment();
    getInterruptedTreatment();
    getViralLoadSamples();
    getViralLoadResults();
    getChildART();
    getAdultART();
    getUnderCareOfCommunityProgram();
    getViralLoadCoverage();
    getViralLoadSuppression();
    getHighViralLoadCascade();
  }, [currentTimeFilter, time]);

  useEffect(() => {
    //insert function to fetch waterfall model data
  }, [waterFallDateRange]);

  return (
    <DashboardContext.Provider
      value={{
        activeClients,
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardProvider;
