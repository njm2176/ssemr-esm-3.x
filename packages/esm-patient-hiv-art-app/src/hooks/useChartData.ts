import { openmrsFetch } from "@openmrs/esm-framework";
import { useState } from "react";
import {
  getThisQuartersRange,
  getThisYearsFirstAndLastDate,
} from "../helpers/dateOps";
import { initialChartDataState } from "../assets/initialChartDataState";
import { formatDataAgainstTime } from "../helpers/formatDataAgainstTime";
import { formatWaterfallData } from "../helpers/formatWaterfallData";
import { sortLineListByAppointmentDate } from "../helpers/sortLineListByAppointmentDate";
import {
  defaultStatHeaders,
  iitAndMissedHeaders,
  txCURRHeaders,
} from "../helpers/statCardHeaders";

export const useChartData = () => {
  const [categoryFilter, setCategoryFilter] = useState("");

  const [time, setTime] = useState({
    startDate: getThisYearsFirstAndLastDate().startDate,
    endDate: getThisYearsFirstAndLastDate().endDate,
  });

  const [waterFallDateRange, setWaterFallDateRange] = useState({
    startDate: getThisQuartersRange().start,
    endDate: getThisQuartersRange().end,
  });

  const [viralLoadRange, setViralLoadRange] = useState({
    startDate: getThisYearsFirstAndLastDate(new Date().getFullYear()).startDate,
    endDate: getThisYearsFirstAndLastDate(new Date().getFullYear()).endDate,
  });

  const [chartData, setChartData] = useState(initialChartDataState);

  const getChartData = async ({
    url,
    responseCallback,
    errorCallBack,
    chartKey,
    noPagination = false,
  }) => {
    try {
      /**
       * Init loading state for  the specific chart
       */
      setChartData((prev) => ({
        ...prev,
        [chartKey]: {
          ...prev[chartKey],
          loading: true,
        },
      }));

      /**
       * send API call and hit the callback
       */
      const response = await openmrsFetch(url);
      responseCallback(response.data);

      /**
       * Turn off the loading state after first page
       */
      setChartData((prev) => ({
        ...prev,
        [chartKey]: {
          ...prev[chartKey],
          loading: false,
        },
      }));

      /**
       * additional pages
       */
      if (!noPagination) {
        const pageSize = 15;
        let currentPage = 1;
        let currentPageSize = pageSize;

        while (currentPageSize === pageSize) {
          const { data } = await openmrsFetch(
            `${url}&page=${currentPage}&size=${pageSize}`
          );

          if (data?.results?.length > 0) {
            setChartData((prev) => ({
              ...prev,
              [chartKey]: {
                ...prev[chartKey],
                raw: {
                  ...(prev[chartKey]?.raw || []),
                  results: [
                    ...(prev[chartKey]?.raw?.results || []),
                    ...data.results,
                  ],
                },
              },
            }));

            currentPageSize = data.results.length;
            currentPage++;
          } else {
            break;
          }
        }
      }
    } catch (error) {
      errorCallBack(error);
    }
  };

  const getChartDatav2 = async ({
    url,
    processor,
    chartKey,
    noPagination = false,
  }) => {
    try {
      /**
       * Init loading state for  the specific chart
       */
      setChartData((prev) => ({
        ...prev,
        [chartKey]: {
          ...prev[chartKey],
          loading: true,
        },
      }));

      /**
       * send API call and hit the callback
       */
      const response = await openmrsFetch(url);

      /**
       * Turn off the loading state after first page
       */
      setChartData((prev) => ({
        ...prev,
        [chartKey]: {
          raw: response.data,
          processedChartData: processor(response.data),
          loading: false,
        },
      }));

      /**
       * additional pages
       */
      if (!noPagination) {
        const pageSize = 15;
        let currentPage = 1;
        let currentPageSize = pageSize;

        while (currentPageSize === pageSize) {
          const { data } = await openmrsFetch(
            `${url}&page=${currentPage}&size=${pageSize}`
          );

          if (data?.results?.length > 0) {
            setChartData((prev) => ({
              ...prev,
              [chartKey]: {
                ...prev[chartKey],
                raw: {
                  ...(prev[chartKey]?.raw || []),
                  results: [
                    ...(prev[chartKey]?.raw?.results || []),
                    ...data.results,
                  ],
                },
              },
            }));

            currentPageSize = data.results.length;
            currentPage++;
          } else {
            break;
          }
        }
      }
    } catch (error) {
      return error;
    }
  };

  /**
   * AJAX requests defined here to avoid repeating them in individual components
   */
  const getActiveClients = () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/activeClients?startDate=${time.startDate}&endDate=${time.endDate}&filter=${categoryFilter}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          activeClients: {
            ...prev.activeClients,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "activeClients",
    });

  const getAllClients = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/allClients?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          allClients: {
            ...prev.allClients,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "allClients",
    });

  const getNewlyEnrolledClients = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/newClients?startDate=${time.startDate}&endDate=${time.endDate}&filter=${categoryFilter}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          newlyEnrolledClients: {
            ...prev.newlyEnrolledClients,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "newlyEnrolledClients",
    });

  const getClientsOnAppointment = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/onAppointment?startDate=${time.startDate}&endDate=${time.endDate}&filter=${categoryFilter}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          onAppointment: {
            ...prev.onAppointment,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "onAppointment",
    });

  const getMissedAppointments = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/missedAppointment?startDate=${time.startDate}&endDate=${time.endDate}&filter=${categoryFilter}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          missedAppointment: {
            ...prev.missedAppointment,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "missedAppointment",
    });

  const getInterruptedTreatment = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/interruptedInTreatment?startDate=${time.startDate}&endDate=${time.endDate}&filter=${categoryFilter}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          interrupted: {
            ...prev.interrupted,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "interrupted",
    });

  const getReturnedToTreatment = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/returnedToTreatment?startDate=${time.startDate}&endDate=${time.endDate}&filter=${categoryFilter}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          returned: {
            ...prev.returned,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "returned",
    });

  const getDueForViralLoad = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/dueForVl?startDate=${time.startDate}&endDate=${time.endDate}&filter=${categoryFilter}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          dueForViralLoad: {
            ...prev.dueForViralLoad,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "dueForViralLoad",
    });

  const getViralLoadSamples = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/viralLoadSamplesCollected?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          viralLoadSamples: {
            ...prev.viralLoadSamples,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "viralLoadSamples",
    });

  const getViralLoadResults = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/viralLoadResults?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          viralLoadResults: {
            ...prev.viralLoadResults,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "viralLoadResults",
    });

  const getHighViralLoad = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/highVl?startDate=${time.startDate}&endDate=${time.endDate}&filter=${categoryFilter}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          highViralLoad: {
            ...prev.highViralLoad,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "highViralLoad",
    });

  const getHighViralLoadCascade = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/viralLoadCascade?startDate=${viralLoadRange.startDate}&endDate=${viralLoadRange.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          highViralLoadCascade: {
            ...prev.highViralLoadCascade,
            raw: data?.results,
            processedChartData: data,
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "highViralLoadCascade",
      noPagination: true,
    });

  const getAdultART = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/adultRegimenTreatment?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          adultART: {
            ...prev.adultART,
            raw: data,
            processedChartData: data?.results,
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "adultART",
      noPagination: true,
    });

  const getChildART = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/childRegimenTreatment?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          childART: {
            ...prev.childART,
            raw: data,
            processedChartData: data?.results,
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "childART",
      noPagination: true,
    });

  const getUnderCareOfCommunityProgram = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/underCareOfCommunityProgrammes?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          underCareOfCommunityProgram: {
            ...prev.underCareOfCommunityProgram,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "underCareOfCommunityProgram",
    });

  const getViralLoadCoverage = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/viralLoadCoverage?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          viralLoadCoverage: {
            ...prev.viralLoadCoverage,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "viralLoadCoverage",
      noPagination: true,
    });

  const getViralLoadSuppression = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/viralLoadSuppression?startDate=${time.startDate}&endDate=${time.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          viralLoadSuppression: {
            ...prev.viralLoadSuppression,
            raw: data,
            processedChartData: formatDataAgainstTime(data),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "viralLoadSuppression",
      noPagination: true,
    });

  const getWaterFallData = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/waterfallAnalysis?startDate=${waterFallDateRange.startDate}&endDate=${waterFallDateRange.endDate}`,
      responseCallback: (data) =>
        setChartData((prev) => ({
          ...prev,
          waterfall: {
            ...prev.waterfall,
            raw: data,
            processedChartData: formatWaterfallData(data?.results),
          },
        })),
      errorCallBack: (error) => error,
      chartKey: "waterfall",
      noPagination: true,
    });

  const stats = [
    {
      title: "Newly enrolled clients(TX_NEW)",
      color: "#3271F4",
      stat: chartData.newlyEnrolledClients?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.newlyEnrolledClients?.raw?.results
      ),
      loading: chartData.newlyEnrolledClients.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "Active clients (TX_CURR)",
      color: "#3271F4",
      stat: chartData.activeClients?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.activeClients?.raw?.results
      ),
      loading: chartData.activeClients.loading,
      headers: txCURRHeaders,
    },
    {
      title: "On appointment",
      color: "#3271F4",
      stat: chartData.onAppointment?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.onAppointment?.raw?.results
      ),
      loading: chartData.onAppointment.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "Missed appointments",
      color: "#FF0000",
      stat: chartData.missedAppointment?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.missedAppointment?.raw?.results
      ),
      loading: chartData.missedAppointment.loading,
      headers: iitAndMissedHeaders,
    },
    {
      title: "Interruptions in Treatment(TX_IIT)",
      color: "#FF8503",
      stat: chartData.interrupted?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.interrupted?.raw?.results
      ),
      loading: chartData.interrupted.loading,
      headers: iitAndMissedHeaders,
    },
    {
      title: "Returned to Treatment(TX_RTT)",
      color: "#3271F4",
      stat: chartData.returned?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(chartData.returned?.raw?.results),
      loading: chartData.returned.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "Due for viral load",
      color: "#FF8503",
      stat: chartData.dueForViralLoad?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.dueForViralLoad?.raw?.results
      ),
      loading: chartData.dueForViralLoad.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "High viral load (>= 1000 copies/ml)",
      color: "#FF0000",
      stat: chartData.highViralLoad?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.highViralLoad?.raw?.results
      ),
      loading: chartData.highViralLoad.loading,
      headers: defaultStatHeaders,
    },
  ];

  return {
    getChartData,
    setChartData,
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
    waterFallDateRange,
    setWaterFallDateRange,
    viralLoadRange,
    setViralLoadRange,
    getWaterFallData,
    defaultStatHeaders,
    txCURRHeaders,
  };
};
