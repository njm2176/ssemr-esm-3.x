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
  }, [currentTimeFilter, time]);

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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardProvider;
