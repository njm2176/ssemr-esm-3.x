import { useState, useEffect } from "react";

const usePatientHistory = (patientUuid, code) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/openmrs/ws/rest/v1/obs?patient=${patientUuid}&_sort=-date&limit=1000`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching observation data:", error);
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [patientUuid]);

  const extractObservationData = (data, keyword) => {
    if (data && data.results) {
      const observation = data.results.find((entry) =>
        entry.display.startsWith(keyword)
      );
      return observation ? observation.display.split(": ")[1] : "---";
    } else {
      return "No observation Found";
    }
  };

  return { data, isLoading, error, extractObservationData };
};

export default usePatientHistory;
