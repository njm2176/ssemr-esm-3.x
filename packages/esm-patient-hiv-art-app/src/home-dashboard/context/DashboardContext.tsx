import React, { createContext, useEffect, useState } from "react";
import {
  adultArtDummy,
  childArtDummy,
  dummy,
  highViralLoadDummy,
} from "../dummy/data";
import { useFetch } from "../../hooks/useFetch";
import { getThisYearsFirstAndLastDate } from "../helpers/dateOps";
import activeClients from "../charts/ActiveClients";
import { useChartData } from "../hooks/useChartData";

export const filterOptions = [
  {
    name: "Year",
    value: "groupYear",
  },
  {
    name: "Month",
    value: "groupMonth",
  },
  {
    name: "Week",
    value: "groupWeek",
  },
];

export const DashboardContext = createContext(null);

const DashboardProvider = ({ children }) => {
  const { getChartData, formatViralLoadData } = useChartData();

  const [currentTimeFilter, setCurrentTimeFilter] = useState(
    filterOptions[0].value
  );
  const [time, setTime] = useState({
    startDate: getThisYearsFirstAndLastDate(new Date().getFullYear()).startDate,
    endDate: getThisYearsFirstAndLastDate(new Date().getFullYear()).endDate,
  });
  const [currentTopFilterIndex, setCurrentTopFilterIndex] = useState(0);

  const [chartData, setChartData] = useState({
    activeClients: {
      raw: null,
      processedChartData: [],
    },
    allClients: {
      raw: null,
      processedChartData: [],
    },
    newlyEnrolledClients: {
      raw: null,
      processedChartData: [],
    },
    onAppointment: {
      raw: null,
      processedChartData: [],
    },
    missedAppointment: {
      raw: null,
      processedChartData: [],
    },
    interrupted: {
      raw: null,
      processedChartData: [],
    },
    returned: {
      raw: null,
      processedChartData: [],
    },
    dueForViralLoad: {
      raw: null,
      processedChartData: [],
    },
    adultART: {
      raw: null,
      processedChartData: [],
    },
    childART: {
      raw: null,
      processedChartData: [],
    },
    viralLoadSamples: {
      raw: null,
      processedChartData: [],
    },
    viralLoadResults: {
      raw: null,
      processedChartData: [],
    },
    highViralLoad: {
      raw: null,
      processedChartData: [],
    },
  });

  const [filters, setFilters] = useState(filterOptions[0].value);

  const { makeRequest } = useFetch();

  const formatDataAgainstTime = (data) => {
    const bottomAxesArray = Object.keys(data?.summary[currentTimeFilter]);

    const formattedData = bottomAxesArray.map((item) => {
      const returnObject = {};
      returnObject[currentTimeFilter] = item;
      returnObject["clients"] = data?.summary[currentTimeFilter][item];

      return returnObject;
    });

    return formattedData;
  };

  const getClientData = async ({ url, params = "", onResult }) => {
    try {
      await makeRequest(url + params, onResult);
    } catch (e) {
      return e;
    }
  };

  /**
   * AJAX requests defined here to avoid repeating them in individual components
   */
  const getActiveClients = () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/activeClients?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          activeClients: {
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) =>
        setChartData((prev) => ({
          ...prev,
          activeClients: {
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          },
        })),
    });

  const getAllClients = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/allClients?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          allClients: {
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => console.error(error),
    });

  const getNewlyEnrolledClients = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/newClients?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          newlyEnrolledClients: {
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) =>
        setChartData((prev) => ({
          ...prev,
          newlyEnrolledClients: {
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          },
        })),
    });

  const getClientsOnAppointment = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/onAppointment?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          onAppointment: {
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) =>
        setChartData((prev) => ({
          ...prev,
          onAppointment: {
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          },
        })),
    });

  const getMissedAppointments = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/missedAppointment?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          missedAppointment: {
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) =>
        setChartData((prev) => ({
          ...prev,
          missedAppointment: {
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          },
        })),
    });

  const getInterruptedTreatment = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/interruptedInTreatment?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          interrupted: {
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) =>
        setChartData((prev) => ({
          ...prev,
          interrupted: {
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          },
        })),
    });

  const getReturnedToTreatment = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/returnedToTreatment?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          returned: {
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) =>
        setChartData((prev) => ({
          ...prev,
          returned: {
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          },
        })),
    });

  const getDueForViralLoad = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/dueForVl?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          dueForViralLoad: {
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) =>
        setChartData((prev) => ({
          ...prev,
          dueForViralLoad: {
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          },
        })),
    });

  const getViralLoadSamples = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/dueForVl?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          viralLoadSamples: {
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) =>
        setChartData((prev) => ({
          ...prev,
          viralLoadSamples: {
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          },
        })),
    });

  const getViralLoadResults = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/dueForVl?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          viralLoadResults: {
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) =>
        setChartData((prev) => ({
          ...prev,
          viralLoadResults: {
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          },
        })),
    });

  const getHighViralLoad = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/highVl?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          highViralLoad: {
            raw: data,
            processedChartData: formatViralLoadData(highViralLoadDummy),
          },
        })),
      errorCallBack: (error) =>
        setChartData((prev) => ({
          ...prev,
          highViralLoad: {
            raw: dummy,
            processedChartData: formatViralLoadData(highViralLoadDummy),
          },
        })),
    });

  const getAdultART = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/adultART?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          adultART: {
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) =>
        setChartData((prev) => ({
          ...prev,
          adultART: {
            raw: dummy,
            processedChartData: formatDataAgainstTime(adultArtDummy),
          },
        })),
    });

  const getChildART = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/childART?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          childART: {
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) =>
        setChartData((prev) => ({
          ...prev,
          childART: {
            raw: dummy,
            processedChartData: formatDataAgainstTime(childArtDummy),
          },
        })),
    });

  const getStat = (dataSet) => {
    const filteredSet = dataSet?.filter((item) =>
      filterTabs[currentTopFilterIndex].filterFunction(item)
    );

    return filteredSet?.length;
  };

  const filterTabs = [
    {
      index: 0,
      title: "All clients",
      filterFunction: (item) => item,
    },
    {
      index: 1,
      title: "Children and adolescent",
      filterFunction: (item) => item.childOrAdolescent,
    },
    {
      index: 2,
      title: "pregnant and Breastfeeding Women",
      filterFunction: (item) => item.pregnantAndBreastfeeding,
    },
    {
      index: 3,
      title: "Return to treatment",
      filterFunction: (item) => item.returningToTreatment,
    },
  ];

  const filterStatData = (stat) => {
    return stat?.filter(filterTabs[currentTopFilterIndex].filterFunction);
  };

  const stats = [
    {
      title: "Newly enrolled clients",
      stat: getStat(chartData.newlyEnrolledClients?.raw?.results),
      results: filterStatData(chartData.newlyEnrolledClients?.raw?.results),
    },
    {
      title: "Active clients (TX_CURR)",
      stat: getStat(chartData.activeClients?.raw?.results),
      results: filterStatData(chartData.activeClients?.raw?.results),
    },
    {
      title: "On appointment",
      stat: getStat(chartData.onAppointment?.raw?.results),
      results: filterStatData(chartData.onAppointment?.raw?.results),
    },
    {
      title: "Missed appointments",
      stat: getStat(chartData.missedAppointment?.raw?.results),
      results: filterStatData(chartData.missedAppointment?.raw?.results),
    },
    {
      title: "Interruptions in Treatment(Iit)",
      stat: getStat(chartData.interrupted?.raw?.results),
      results: filterStatData(chartData.interrupted?.raw?.results),
    },
    {
      title: "Returned to Treatment(Tx_Rtt)",
      stat: getStat(chartData.returned?.raw?.results),
      results: filterStatData(chartData.returned?.raw?.results),
    },
    {
      title: "Due for viral load",
      stat: getStat(chartData.dueForViralLoad?.raw?.results),
      results: filterStatData(chartData.dueForViralLoad?.raw?.results),
    },
    {
      title: "High viral load",
      stat: getStat(chartData.highViralLoad?.raw?.results),
      results: filterStatData(chartData.highViralLoad?.raw?.results),
    },
  ];

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
