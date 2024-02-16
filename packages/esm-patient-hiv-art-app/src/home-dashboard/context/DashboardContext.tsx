import React, { createContext, useEffect, useState } from "react";
import { dummy } from "../dummy/data";
import { useFetch } from "../../hooks/useFetch";
import styles from "../home-dashboard.scss";

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
  const [currentTimeFilter, setCurrentTimeFilter] = useState(
    filterOptions[0].value
  );
  const [currentTopFilterIndex, setCurrentTopFilterIndex] = useState(0);
  const [filters, setFilters] = useState(filterOptions[0].value);

  const { makeRequest } = useFetch();

  const [activeClients, setActiveClients] = useState({
    raw: null,
    processedChartData: [],
  });
  const [allClients, setAllClients] = useState(dummy);
  const [newlyEnrolledClients, setNewlyEnrolledClients] = useState({
    raw: null,
    processedChartData: [],
  });
  const [onAppointment, setOnAppointment] = useState(dummy);
  const [missedAppointment, setMissedAppointment] = useState(dummy);
  const [interrupted, setInterrupted] = useState(dummy);
  const [returned, setReturned] = useState(dummy);
  const [dueForViralLoad, setDueForViralLoad] = useState({
    raw: null,
    processedChartData: [],
  });
  const [viralLoadSamples, setViralLoadSamples] = useState({
    raw: null,
    processedChartData: [],
  });
  const [viralLoadResults, setViralLoadResults] = useState({
    raw: null,
    processedChartData: [],
  });
  const [highViralLoad, setHighViralLoad] = useState({
    raw: null,
    processedChartData: [],
  });

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
      await makeRequest(url + filters + params, onResult);
    } catch (e) {
      return e;
    }
  };

  /**
   * AJAX requests defined here to avoid repeating them in individual components
   */
  const getActiveClients = async () => {
    await getClientData({
      url: "/ws/rest/v1/ssemr/dashboard/activeClients",
      onResult(responseData, error) {
        if (responseData) {
          setActiveClients((prev) => ({
            ...prev,
            processedChartData: formatDataAgainstTime(responseData),
          }));
        }
        if (error) {
          setActiveClients((prev) => ({
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          }));
          return error;
        }
      },
    });
  };

  const getAllClients = async () => {
    await getClientData({
      url: "/ws/fhir2/R4/Patient",
      onResult: (responseData, error) => {
        if (responseData) {
          setAllClients(responseData);
        }
        if (error) return error;
      },
    });
  };

  const getNewlyEnrolledClients = async () => {
    const formatDate = (date: Date) => {
      const day = date.getDate();
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const year = date.getFullYear();

      return `${month}/${day}/${year}`;
    };

    const thirtyDaysAgo = () => {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return formatDate(thirtyDaysAgo);
    };

    await getClientData({
      url: `/ws/rest/v1/ssemr/dashboard/newClients?startDate=${thirtyDaysAgo()}&endDate=${formatDate(
        new Date()
      )}`,
      onResult: (responseData, error) => {
        if (responseData) {
          setNewlyEnrolledClients((prev) => ({
            ...prev,
            processedChartData: formatDataAgainstTime(responseData),
          }));
        }
        if (error) {
          setNewlyEnrolledClients((prev) => ({
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          }));
          return error;
        }
      },
    });
  };

  const getClientsOnAppointment = async () => {
    await getClientData({
      url: "/ws/rest/v1/ssemr/dashboard/activeClients",
      onResult: (responseData, error) => {
        if (responseData) {
          setOnAppointment(responseData);
        }
        if (error) return error;
      },
    });
  };

  const getMissedAppointments = async () => {
    await getClientData({
      url: "/ws/rest/v1/ssemr/dashboard/missedAppointment",
      onResult: (responseData, error) => {
        if (responseData) {
          setMissedAppointment(responseData);
        }
        if (error) return error;
      },
    });
  };

  const getInterruptedTreatment = async () => {
    await getClientData({
      url: "/ws/rest/v1/ssemr/dashboard/interruptedInTreatment",
      onResult: (responseData, error) => {
        if (responseData) {
          setInterrupted(responseData);
        }
        if (error) return error;
      },
    });
  };

  const getReturnedToTreatment = async () => {
    await getClientData({
      url: "/ws/rest/v1/ssemr/dashboard/returnToTreatment",
      onResult: (responseData, error) => {
        if (responseData) {
          setReturned(responseData);
        }
        if (error) return error;
      },
    });
  };

  const getDueForViralLoad = async () => {
    await getClientData({
      url: "/ws/rest/v1/ssemr/dashboard/dueForVl",
      onResult: (responseData, error) => {
        if (responseData) {
          setDueForViralLoad((prev) => ({
            ...prev,
            processedChartData: formatDataAgainstTime(responseData),
          }));
        }
        if (error) {
          setDueForViralLoad((prev) => ({
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          }));
          return error;
        }
      },
    });
  };

  const getViralLoadSamples = async () => {
    await getClientData({
      url: "/ws/rest/v1/ssemr/dashboard/dueForVl",
      onResult: (responseData, error) => {
        if (responseData) {
          setViralLoadSamples((prev) => ({
            ...prev,
            processedChartData: formatDataAgainstTime(responseData),
          }));
        }
        if (error) {
          setViralLoadSamples((prev) => ({
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          }));
          return error;
        }
      },
    });
  };

  const getViralLoadResults = async () => {
    await getClientData({
      url: "/ws/rest/v1/ssemr/dashboard/dueForVl",
      onResult: (responseData, error) => {
        if (responseData) {
          setViralLoadResults((prev) => ({
            ...prev,
            processedChartData: formatDataAgainstTime(responseData),
          }));
        }
        if (error) {
          setViralLoadResults((prev) => ({
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          }));
          return error;
        }
      },
    });
  };

  const getHighViralLoad = async () => {
    await getClientData({
      url: "/ws/rest/v1/ssemr/dashboard/highVl",
      onResult: (responseData, error) => {
        if (responseData) {
          setHighViralLoad((prev) => ({
            ...prev,
            processedChartData: formatDataAgainstTime(responseData),
          }));
        }
        if (error) {
          setHighViralLoad((prev) => ({
            raw: dummy,
            processedChartData: formatDataAgainstTime(dummy),
          }));
          return error;
        }
      },
    });
  };

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
      title: "Clients returning from interrupted treatment",
      filterFunction: (item) => item.returningFromIT,
    },
    {
      index: 4,
      title: "Return to treatment",
      filterFunction: (item) => item.returningToTreatment,
    },
  ];

  const stats = [
    {
      title: "Newly enrolled clients",
      url: "/ws/rest/v1/ssemr/dashboard/newClients",
      stat: getStat(newlyEnrolledClients?.raw?.results),
      icon: (
        <div className={styles.statIconWrapper}>
          <svg
            className={styles.statIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
          </svg>
        </div>
      ),
    },
    {
      title: "Active clients (TX_CURR)",
      url: "/ws/rest/v1/ssemr/dashboard/activeClients",
      stat: getStat(activeClients?.raw?.results),
      icon: (
        <div className={styles.statIconWrapper}>
          <svg
            className={styles.statIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
          </svg>
        </div>
      ),
    },
    {
      title: "On appointment",
      url: "/ws/rest/v1/ssemr/dashboard/newClients",
      stat: getStat(onAppointment?.results),
      icon: (
        <div className={styles.statIconWrapper}>
          <svg
            className={styles.statIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192zM224 248c13.3 0 24 10.7 24 24v56h56c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V376H144c-13.3 0-24-10.7-24-24s10.7-24 24-24h56V272c0-13.3 10.7-24 24-24z" />
          </svg>
        </div>
      ),
    },
    {
      title: "Missed appointments",
      url: "/ws/rest/v1/ssemr/dashboard/missedAppointment",
      stat: getStat(missedAppointment?.results),
      icon: (
        <div
          className={styles.statIconWrapper}
          style={{ backgroundColor: "#ff0000" }}
        >
          <svg
            className={styles.statIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
          </svg>
        </div>
      ),
    },
    {
      title: "Interruptions in Treatment(Iit)",
      url: "/ws/rest/v1/ssemr/dashboard/interruptedInTreatment",
      stat: getStat(interrupted?.results),
      icon: (
        <div
          className={styles.statIconWrapper}
          style={{ backgroundColor: "#FFBF00" }}
        >
          <svg
            className={styles.statIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
          </svg>
        </div>
      ),
    },
    {
      title: "Returned to Treatment(Tx_Rtt)",
      url: "/ws/rest/v1/ssemr/dashboard/interruptedInTreatment",
      stat: getStat(returned?.results),
      icon: (
        <div
          className={styles.statIconWrapper}
          style={{ backgroundColor: "#ff0000" }}
        >
          <svg
            className={styles.statIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </div>
      ),
    },
    {
      title: "Due for viral load",
      url: "/ws/rest/v1/ssemr/dashboard/dueForVl",
      stat: getStat(dueForViralLoad?.raw?.results),
      icon: (
        <div
          className={styles.statIconWrapper}
          style={{ backgroundColor: "#FFBF00" }}
        >
          <svg
            className={styles.statIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
          </svg>
        </div>
      ),
    },
    {
      title: "High viral load",
      url: "/ws/rest/v1/ssemr/dashboard/highVl",
      stat: getStat(highViralLoad?.raw?.results),
      icon: (
        <div
          className={styles.statIconWrapper}
          style={{ backgroundColor: "#ff0000" }}
        >
          <svg
            className={styles.statIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </div>
      ),
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
  }, [currentTimeFilter]);

  return (
    <DashboardContext.Provider
      value={{
        activeClients,
        allClients,
        currentTimeFilter,
        currentTopFilterIndex,
        dueForViralLoad,
        filterTabs,
        filters,
        highViralLoad,
        interrupted,
        missedAppointment,
        newlyEnrolledClients,
        onAppointment,
        returned,
        setCurrentTimeFilter,
        setCurrentTopFilterIndex,
        setFilters,
        stats,
        viralLoadResults,
        viralLoadSamples,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardProvider;
