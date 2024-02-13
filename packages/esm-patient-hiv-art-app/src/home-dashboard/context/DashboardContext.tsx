import React, { createContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export const DashboardContext = createContext(null);
const DashboardProvider = ({ children }) => {
  /**
   * state hook to store all clients
   */
  const [allClients, setALlClients] = useState([]);

  /**
   * State hook to store newly enrolled clients
   */
  const [newlyEnrolledClients, setNewlyEnrolledClients] = useState([]);

  /**
   * Custom hook that use openmrsFetch
   */
  const { makeRequest, error, data: fetchedData, loading } = useFetch();

  /**
   * Gets all clients on the ART programme
   */
  const getAllClients = async () => {
    try {
      await makeRequest("/ws/fhir2/R4/Patient", (responseData, error) => {
        if (error) {
          return error;
        } else {
          setALlClients(responseData.entry);
        }
      });
    } catch (e) {
      return e;
    }
  };

  /**
   * Clients registered within the last one month
   */
  const getNewlyEnrolledClients = async () => {
    const formatDate = (date: Date) => {
      const day = date.getDate();
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    };

    const thirtyDaysAgo = () => {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return formatDate(thirtyDaysAgo);
    };

    try {
      await makeRequest(
        `/ws/rest/v1/ssemr/dashboard/newClients?startDate=${thirtyDaysAgo()}&endDate=${formatDate(
          new Date()
        )}`,
        (responseData, error) => {
          if (error) return error;
          else setNewlyEnrolledClients(responseData);
        }
      );
    } catch (e) {}
  };

  /**
   * Effect hook that fires on mount
   */
  useEffect(() => {
    getAllClients();
    getNewlyEnrolledClients();
  }, []);

  return (
    <DashboardContext.Provider value={{ allClients, newlyEnrolledClients }}>
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardProvider;
