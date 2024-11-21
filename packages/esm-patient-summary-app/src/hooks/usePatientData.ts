import { openmrsFetch } from "@openmrs/esm-framework";
import { useState, useEffect } from "react";

const usePatientData = (patientUuid) => {
  const [patientData, setPatientData] = useState(null);
  const [Loading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/openmrs/ws/rest/v1/patient/${patientUuid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (patientUuid) {
      fetchPatientData();
    }
  }, [patientUuid]);

  useEffect(() => {
    const fetchClientEligibility = async () => {
      try {
        const { data } = await openmrsFetch(`ws/rest/v1/ssemr/flags?patientUuid=${patientUuid}`);

        setFlags(data?.results);
      } catch (error) {
        setError(error);
      }
    }

    if (patientUuid) {
      fetchClientEligibility();
    }

    console.log(flags);
  }, [patientUuid]);

  return { patientData, Loading, isError, flags };
};

export default usePatientData;
