import { useState, useEffect } from "react";

const useVisitHistory = (patientUuid, code) => {
  const [visitData, setVisitData] = useState([]);
  const [Loading, setIsLoading] = useState(false);
  const [Iserror, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/openmrs/ws/rest/v1/visit?patient=${patientUuid}&includeInactive=true&fromStartDate=2016-10-08T04:09:23.000Z&v=default`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        if (jsonData.results && jsonData.results.length > 0) {
          setVisitData(jsonData.results);
        }
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();

    return () => {};
  }, [patientUuid]);

  return { visitData, Loading, Iserror };
};

export default useVisitHistory;
