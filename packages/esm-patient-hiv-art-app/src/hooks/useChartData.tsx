import { openmrsFetch } from "@openmrs/esm-framework";
import React, { useState } from "react";
import {
  getThisMonthsFirstAndLast,
  getThisQuartersRange,
  getThisYearsFirstAndLastDate,
} from "../helpers/dateOps";
import Link from "@carbon/react/lib/components/UIShell/Link";
import { TableCell, Tag } from "@carbon/react";

export const useChartData = () => {
  const filterOptions = [
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

  const [currentTopFilterIndex, setCurrentTopFilterIndex] = useState(0);

  const [filters, setFilters] = useState(filterOptions[0].value);

  const [time, setTime] = useState({
    startDate: getThisYearsFirstAndLastDate(new Date().getFullYear()).startDate,
    endDate: getThisYearsFirstAndLastDate(new Date().getFullYear()).endDate,
  });

  const [waterFallDateRange, setWaterFallDateRange] = useState({
    start: getThisQuartersRange().start,
    end: getThisQuartersRange().end,
  });

  const [viralLoadRange, setViralLoadRange] = useState({
    start: getThisMonthsFirstAndLast().startDate,
    end: getThisMonthsFirstAndLast().endDate,
  });

  const [chartData, setChartData] = useState({
    activeClients: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    allClients: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    newlyEnrolledClients: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    onAppointment: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    missedAppointment: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    interrupted: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    returned: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    dueForViralLoad: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    adultART: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    childART: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    viralLoadSamples: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    viralLoadResults: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    highViralLoad: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    underCareOfCommunityProgram: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    viralLoadCoverage: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    viralLoadSuppression: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    highViralLoadCascade: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
    waterfall: {
      raw: null,
      processedChartData: [],
      loading: false,
    },
  });

  const [currentTimeFilter, setCurrentTimeFilter] = useState(
    filterOptions[0].value
  );

  const getChartData = async ({
    url,
    responseCallback,
    errorCallBack,
    chartKey,
    noPagination = false,
  }) => {
    try {
      setChartData((prev) => {
        const obj = {
          ...prev,
        };
        obj[chartKey] = {
          ...prev[chartKey],
          loading: true,
        };

        return obj;
      });

      const response = await openmrsFetch(url);
      responseCallback(response.data);
    } catch (error) {
      errorCallBack(error);
    } finally {
      setChartData((prev) => {
        const obj = {
          ...prev,
        };

        obj[chartKey] = {
          ...prev[chartKey],
          loading: false,
        };

        return obj;
      });
      !noPagination && fetchRemainingPages({ chartKey, url });
    }
  };

  const fetchRemainingPages = async ({ chartKey, url }) => {
    try {
      const pageSize = 15;
      let currentPageSize = 15;
      let currentPage = 1;

      while (currentPageSize === pageSize) {
        const { data } = await openmrsFetch(
          `${url}&page=${currentPage}&size=${pageSize}`
        );
        if (data?.results?.length > 0) {
          if (Object.prototype.hasOwnProperty.call(data.results[0], "sex")) {
            setChartData((prev) => ({
              ...prev,
              [chartKey]: {
                ...prev[chartKey],
                raw: {
                  ...(prev[chartKey]?.raw || []),
                  results: [
                    ...(prev[chartKey]?.raw?.results || []),
                    ...(data?.results || []),
                  ],
                },
              },
            }));
          }
        }

        currentPageSize = data?.results?.length;
        currentPage++;
      }
    } catch (e) {
      return e;
    }
  };

  const formatViralLoadData = (data) => {
    const processedData = data?.summary?.groupYear?.map((item) => {
      const keys = Object.keys(item);
      return {
        value: item[keys[0]],
        group: keys[0],
      };
    });
    return processedData;
  };

  const formatDataAgainstTime = (data) => {
    if (data === undefined) return;
    let bottomAxesArray;
    if (data?.summary)
      bottomAxesArray = Object.keys(data?.summary[currentTimeFilter]);
    else if (data[currentTimeFilter])
      bottomAxesArray = Object.keys(data[currentTimeFilter]);
    else return;

    const formattedData = bottomAxesArray.map((item) => {
      const returnObject = {};
      returnObject[currentTimeFilter] = item;

      let clients;
      if (data?.summary) clients = data?.summary[currentTimeFilter][item];
      else clients = data[currentTimeFilter][item];
      returnObject["clients"] = clients;

      return returnObject;
    });

    return formattedData;
  };

  const formatWaterfallData = (data) => {
    const TX_CURR = data.find((item) => Object.keys(item).includes("TX_CURR"))[
      "TX_CURR"
    ];

    const transferIn = data.find((item) =>
      Object.keys(item).includes("Transfer In")
    )["Transfer In"];

    const TX_NEW = data.find((item) => Object.keys(item).includes("TX_NEW"))[
      "TX_NEW"
    ];

    const TX_RTT = data.find((item) => Object.keys(item).includes("TX_RTT"))[
      "TX_RTT"
    ];

    const potentialTXCurr = data.find((item) =>
      Object.keys(item).includes("Potential TX_CURR")
    )["Potential TX_CURR"];

    const transferOut = data.find((item) =>
      Object.keys(item).includes("Transfer Out")
    )["Transfer Out"];

    const TX_DEATH = data.find((item) =>
      Object.keys(item).includes("TX_DEATH")
    )["TX_DEATH"];

    const selfTransfer = data.find((item) =>
      Object.keys(item).includes("TX_ML_Self Transfer")
    )["TX_ML_Self Transfer"];

    const refusal = data.find((item) =>
      Object.keys(item).includes("TX_ML_Refusal/Stopped")
    )["TX_ML_Refusal/Stopped"];

    const onARTLessThanThree = data.find((item) =>
      Object.keys(item).includes("TX_ML_IIT (<3 mo)")
    )["TX_ML_IIT (<3 mo)"];

    const onARTMoreThanThree = data.find((item) =>
      Object.keys(item).includes("TX_ML_IIT (3+ mo)")
    )["TX_ML_IIT (3+ mo)"];

    const calculated = data.find((item) =>
      Object.keys(item).includes("CALCULATED TX_CURR")
    )["CALCULATED TX_CURR"];

    const processed = [
      {
        group: "TX_CURR",
        value: [0, TX_CURR],
      },
      {
        group: "Transfer In",
        value: [TX_CURR, transferIn + TX_CURR],
      },
      {
        group: "TX_NEW",
        value: [transferIn + TX_CURR, transferIn + TX_CURR + TX_NEW],
      },
      {
        group: "TX_RTT",
        value: [
          transferIn + TX_CURR + TX_NEW,
          transferIn + TX_CURR + TX_NEW + TX_RTT,
        ],
      },
      {
        group: "Potential TX_CURR",
        value: [0, potentialTXCurr],
      },
      {
        group: "Transfer Out",
        value: [potentialTXCurr - transferOut, potentialTXCurr],
      },
      {
        group: "TX_DEATH",
        value: [
          potentialTXCurr - transferOut - TX_DEATH,
          potentialTXCurr - transferOut,
        ],
      },
      {
        group: "TX_ML_Self Transfer",
        value: [
          potentialTXCurr - transferOut - TX_DEATH - selfTransfer,
          potentialTXCurr - transferOut - TX_DEATH,
        ],
      },
      {
        group: "TX_ML_Refusal/Stopped",
        value: [
          potentialTXCurr - transferOut - TX_DEATH - selfTransfer - refusal,
          potentialTXCurr - transferOut - TX_DEATH - selfTransfer,
        ],
      },
      {
        group: "TX_ML_IIT (on ART <3 mo)",
        value: [
          potentialTXCurr -
            transferOut -
            TX_DEATH -
            selfTransfer -
            refusal -
            onARTLessThanThree,
          potentialTXCurr - transferOut - TX_DEATH - selfTransfer - refusal,
        ],
      },
      {
        group: "TX_ML_IIT (on ART 3+ mo)",
        value: [
          potentialTXCurr -
            transferOut -
            TX_DEATH -
            selfTransfer -
            refusal -
            onARTLessThanThree -
            onARTMoreThanThree,
          potentialTXCurr -
            transferOut -
            TX_DEATH -
            selfTransfer -
            refusal -
            onARTLessThanThree,
        ],
      },
      {
        group: "Calculated",
        value: [0, calculated],
      },
    ];

    return processed;
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
      url: `/ws/rest/v1/ssemr/dashboard/newClients?startDate=${time.startDate}&endDate=${time.endDate}`,
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
      url: `/ws/rest/v1/ssemr/dashboard/onAppointment?startDate=${time.startDate}&endDate=${time.endDate}`,
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
      url: `/ws/rest/v1/ssemr/dashboard/missedAppointment?startDate=${time.startDate}&endDate=${time.endDate}`,
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
      url: `/ws/rest/v1/ssemr/dashboard/interruptedInTreatment?startDate=${time.startDate}&endDate=${time.endDate}`,
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
      url: `/ws/rest/v1/ssemr/dashboard/returnedToTreatment?startDate=${time.startDate}&endDate=${time.endDate}`,
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
      url: `/ws/rest/v1/ssemr/dashboard/dueForVl?startDate=${time.startDate}&endDate=${time.endDate}`,
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
      url: `/ws/rest/v1/ssemr/dashboard/highVl?startDate=${time.startDate}&endDate=${time.endDate}`,
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
      url: `/ws/rest/v1/ssemr/dashboard/viralLoadCascade?startDate=${viralLoadRange.start}&endDate=${viralLoadRange.end}`,
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
    });

  const getWaterFallData = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/waterfallAnalysis?startDate=${waterFallDateRange.start}&endDate=${waterFallDateRange.end}`,
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
      noPagination: true
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
  ];

  const filterStatData = (stat) => {
    return stat?.filter(filterTabs[currentTopFilterIndex].filterFunction);
  };

  const defaultStatHeaders = [
    {
      name: "Name",
      selector: "name",
      cell: (row) => (
        <TableCell>
          <Link
            href={`${window.getOpenmrsSpaBase()}patient/${
              row?.uuid
            }/chart/Patient%20Summary`}
          >
            {row.name}
          </Link>
        </TableCell>
      ),
    },
    {
      name: "Sex",
      selector: "sex",
    },
    {
      name: "Date enrolled",
      selector: "dateEnrolled",
    },
    {
      name: "Last refill date",
      selector: "lastRefillDate",
    },
    {
      name: "Contact",
      selector: "contact",
    },
    {
      name: "Village",
      selector: "village",
      cell: (row) => (
        <TableCell>
          <p className="">{row.address.split(",")[0].split(":")[1]}</p>
        </TableCell>
      ),
    },
    {
      name: "Landmark",
      selector: "landMark",
      cell: (row) => (
        <TableCell>
          <p className="">{row.address.split(",")[1].split(":")[1]}</p>
        </TableCell>
      ),
    },
  ];

  const txCURRHeaders = [
    ...defaultStatHeaders,
    {
      name: "Eligible for VL",
      selector: "dueForVl",
      cell: (row) => (
        <TableCell size="sm">
          <Tag size="md" type={`${row.dueForVl ? "green" : "red"}`}>
            {row?.dueForVl ? "Eligible" : "Not eligible"}
          </Tag>
        </TableCell>
      ),
    },
  ];

  const stats = [
    {
      title: "Newly enrolled clients(TX_NEW)",
      color: "#3271F4",
      stat: chartData.newlyEnrolledClients?.raw?.totalPatients,
      results: filterStatData(chartData.newlyEnrolledClients?.raw?.results),
      loading: chartData.newlyEnrolledClients.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "Active clients (TX_CURR)",
      color: "#3271F4",
      stat: chartData.activeClients?.raw?.totalPatients,
      results: filterStatData(chartData.activeClients?.raw?.results),
      loading: chartData.activeClients.loading,
      headers: txCURRHeaders,
    },
    {
      title: "On appointment",
      color: "#3271F4",
      stat: chartData.onAppointment?.raw?.totalPatients,
      results: filterStatData(chartData.onAppointment?.raw?.results),
      loading: chartData.onAppointment.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "Missed appointments",
      color: "#FF0000",
      stat: chartData.missedAppointment?.raw?.totalPatients,
      results: filterStatData(chartData.missedAppointment?.raw?.results),
      loading: chartData.missedAppointment.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "Interruptions in Treatment(TX_IIT)",
      color: "#FF8503",
      stat: chartData.interrupted?.raw?.totalPatients,
      results: filterStatData(chartData.interrupted?.raw?.results),
      loading: chartData.interrupted.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "Returned to Treatment(TX_RTT)",
      color: "#3271F4",
      stat: chartData.returned?.raw?.totalPatients,
      results: filterStatData(chartData.returned?.raw?.results),
      loading: chartData.returned.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "Due for viral load",
      color: "#FF8503",
      stat: chartData.dueForViralLoad?.raw?.totalPatients,
      results: filterStatData(chartData.dueForViralLoad?.raw?.results),
      loading: chartData.dueForViralLoad.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "High viral load (>= 1000 copies/ml)",
      color: "#FF0000",
      stat: chartData.highViralLoad?.raw?.totalPatients,
      results: filterStatData(chartData.highViralLoad?.raw?.results),
      loading: chartData.highViralLoad.loading,
      headers: defaultStatHeaders,
    },
  ];

  return {
    getChartData,
    formatViralLoadData,
    setChartData,
    chartData,
    setCurrentTimeFilter,
    currentTimeFilter,
    time,
    setTime,
    currentTopFilterIndex,
    setCurrentTopFilterIndex,
    filters,
    setFilters,
    formatDataAgainstTime,
    getActiveClients,
    getStat,
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
    waterFallDateRange,
    setWaterFallDateRange,
    viralLoadRange,
    setViralLoadRange,
    getWaterFallData,
    defaultStatHeaders,
    txCURRHeaders,
  };
};
