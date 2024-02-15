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
  const [dueForViralLoad, setDueForViralLoad] = useState(dummy);
  const [highViralLoad, setHighViralLoad] = useState(dummy);

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
          formatDataAgainstTime(dummy);
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
          setDueForViralLoad(responseData);
        }
        if (error) return error;
      },
    });
  };

  const getHighViralLoad = async () => {
    await getClientData({
      url: "/ws/rest/v1/ssemr/dashboard/highVl",
      onResult: (responseData, error) => {
        if (responseData) {
          setHighViralLoad(responseData);
        }
        if (error) return error;
      },
    });
  };

  const tabInfo = [
    {
      title: "All clients",
    },
    {
      title: "Children and adolescent",
    },
    {
      title: "pregnant and Breastfeeding Women",
    },
    {
      title: "Clients returning from interrupted treatment",
    },
    {
      title: "Return to treatment",
    },
  ];

  const stats = [
    {
      title: "Newly enrolled clients",
      url: "/ws/rest/v1/ssemr/dashboard/newClients",
      stat: newlyEnrolledClients?.raw?.results?.length,
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
      stat: activeClients?.raw?.results?.length,
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
      stat: onAppointment?.results?.length,
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
      stat: missedAppointment?.results?.length,
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
      stat: interrupted?.results?.length,
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
      stat: returned?.results?.length,
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
      stat: dueForViralLoad?.results?.length,
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
      stat: highViralLoad?.results?.length,
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
  }, [currentTimeFilter]);

  return (
    <DashboardContext.Provider
      value={{
        setFilters,
        filters,
        setCurrentTimeFilter,
        currentTimeFilter,
        activeClients,
        allClients,
        newlyEnrolledClients,
        onAppointment,
        missedAppointment,
        interrupted,
        returned,
        dueForViralLoad,
        highViralLoad,
        stats,
        tabInfo,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardProvider;
