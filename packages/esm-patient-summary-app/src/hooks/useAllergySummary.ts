import { useState, useEffect } from "react";

const useAllergySummary = (patientUuid, code) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/openmrs/ws/rest/v1/obs?patient=${patientUuid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();

    // Cleanup function
    return () => {
      // Optionally, perform cleanup here (e.g., abort ongoing fetch)
    };
  }, [patientUuid]);

  const extractObservationData = (data, keyword) => {
    const observation = data?.results.find((entry) =>
      entry.display.startsWith(keyword)
    );
    return observation ? observation.display.split(": ")[1] : "---";
  };

  return { data, isLoading, error, extractObservationData };
};

export default useAllergySummary;
