import React, {createContext, useEffect} from "react";
import {useChartData} from "../hooks/useChartData";

export const DashboardContext = createContext(null);

const DashboardProvider = ({children}) => {
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

  useEffect(() => {
    const fetchDataSequentially = async () => {
      try {
        await getNewlyEnrolledClients();
        await getActiveClients();
        await getAdultART();
        await getChildART();
        await getAllClients();
        await getUnderCareOfCommunityProgram();
        await getDueForViralLoad();
        await getViralLoadSamples();
        await getViralLoadResults();
        await getViralLoadCoverage();
        await getViralLoadSuppression();
        await getHighViralLoad();
        await getClientsOnAppointment();
        await getMissedAppointments();
        await getReturnedToTreatment();
        await getInterruptedTreatment();
      } catch (e) {
        return e;
      }
    };

    fetchDataSequentially();
  }, [currentTimeFilter, time]);

  useEffect(() => {
    //insert function to fetch waterfall model data
    getWaterFallData();
  }, [waterFallDateRange]);

  useEffect(() => {
    //insert function to fetch waterfall model data
    getHighViralLoadCascade();
  }, [viralLoadRange]);

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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardProvider;
