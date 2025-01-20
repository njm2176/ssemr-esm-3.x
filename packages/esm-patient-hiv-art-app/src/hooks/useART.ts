import { openmrsFetch } from "@openmrs/esm-framework";
import { useEffect, useRef, useState } from "react";
import {
  getThisQuartersRange,
  getThisYearsFirstAndLastDate,
} from "../helpers/dateOps";
import { initialChartDataState } from "../assets/initialChartDataState";
import { sortLineListByAppointmentDate, sortLineListByAppointmentDateDescending } from "../helpers/sortLineListByAppointmentDate";
import {
  defaultStatHeaders,
  iitAndMissedHeaders,
  txCURRHeaders,
  rttHeaders,
} from "../helpers/statCardHeaders";

export const useART = () => {
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
  /**
   * Abort controller ref to keep track of the controller between renders
   */
  const abortControllers = useRef(new Map());

  /**
   * Effect hook to cancel all requests in flight once the category filter and the time filter changes
   */
  useEffect(() => {
    return () => {
      abortControllers.current.forEach((controller) =>
        controller.abort("admin-override")
      );
      abortControllers.current.clear();
    };
  }, [categoryFilter, time]);

  /**
   * Function to make all http requests
   * @param url
   * @param processor
   * @param chartKey
   * @param noPagination
   */
  const getDashboardData = async ({
    url,
    processor,
    chartKey,
    noPagination = false,
  }) => {
    try {
      /**
       * Abort previous requests if any
       */
      if (abortControllers.current.has(chartKey))
        abortControllers.current.get(chartKey).abort("admin-override");

      /**
       * Create a new abort controller
       */
      const controller = new AbortController();
      abortControllers.current.set(chartKey, controller);

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
       * Page sizes
       */
      const pageSize = 15;

      /**
       * send API call and hit the callback
       */
      const response = await openmrsFetch(`${url}&page=0&size=${pageSize}`, {
        signal: controller.signal,
      });

      /**
       * Turn off the loading state after first page
       */
      setChartData((prev) => ({
        ...prev,
        [chartKey]: {
          raw: response.data,
          processedChartData: processor(response.data),
          loading: false,
          lineListComplete: noPagination || response?.data?.pageSize < pageSize,
        },
      }));

      /**
       * additional pages
       */

      if (!noPagination && response?.data?.pageSize === pageSize) {
        let currentPage = 1;
        let currentPageSize = pageSize;

        while (currentPageSize === pageSize) {
          const { data } = await openmrsFetch(
            `${url}&page=${currentPage}&size=${pageSize}`,
            { signal: controller.signal }
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
        /**
         * set the line list as complete for that chart-key
         */
        setChartData((prev) => ({
          ...prev,
          [chartKey]: {
            ...prev[chartKey],
            lineListComplete: true,
          },
        }));
      }
    } catch (error) {
      /**
       * Turn off the loading state after first page
       */
      if (error !== "admin-override")
        setChartData((prev) => ({
          ...prev,
          [chartKey]: {
            ...prev[chartKey],
            loading: false,
          },
        }));
      return error;
    }
  };

  const stats = [
    {
      title: "Newly enrolled clients(TX_NEW)",
      color: "#3271F4",
      stat: chartData.newlyEnrolledClients?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.newlyEnrolledClients?.raw?.results
      ),
      state: chartData.newlyEnrolledClients,
      headers: defaultStatHeaders,
    },
    {
      title: "Active clients (TX_CURR)",
      color: "#3271F4",
      stat: chartData.activeClients?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.activeClients?.raw?.results
      ),
      state: chartData.activeClients,
      headers: txCURRHeaders,
    },
    {
      title: "On appointment",
      color: "#3271F4",
      stat: chartData.onAppointment?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.onAppointment?.raw?.results
      ),
      state: chartData.onAppointment,
      headers: defaultStatHeaders,
    },
    {
      title: "Missed appointments",
      color: "#FF0000",
      stat: chartData.missedAppointment?.raw?.totalPatients,
      results: sortLineListByAppointmentDateDescending(
        chartData.missedAppointment?.raw?.results
      ),
      state: chartData.missedAppointment,
      headers: iitAndMissedHeaders,
    },
    {
      title: "Cumulative Interruptions in Treatment(TX_IIT)",
      color: "#FF8503",
      stat: chartData.interrupted?.raw?.totalPatients,
      results: sortLineListByAppointmentDateDescending(
        chartData.interrupted?.raw?.results
      ),
      state: chartData.interrupted,
      headers: iitAndMissedHeaders,
    },
    {
      title: "Returned to Treatment(TX_RTT)",
      color: "#3271F4",
      stat: chartData.returned?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(chartData.returned?.raw?.results),
      state: chartData.returned,
      headers: rttHeaders,
    },
    {
      title: "Due for viral load",
      color: "#FF8503",
      stat: chartData.dueForViralLoad?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.dueForViralLoad?.raw?.results
      ),
      state: chartData.dueForViralLoad,
      headers: defaultStatHeaders,
    },
    {
      title: "High viral load (>= 1000 copies/ml)",
      color: "#FF0000",
      stat: chartData.highViralLoad?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.highViralLoad?.raw?.results
      ),
      state: chartData.highViralLoad,
      headers: defaultStatHeaders,
    },
  ];

  return {
    getDashboardData,
    chartData,
    time,
    setTime,
    categoryFilter,
    setCategoryFilter,
    stats,
    waterFallDateRange,
    setWaterFallDateRange,
    viralLoadRange,
    setViralLoadRange,
    defaultStatHeaders,
    txCURRHeaders,
  };
};
