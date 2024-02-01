import { openmrsFetch } from "@openmrs/esm-framework";
import { useState } from "react";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const makeRequest = async (url) => {
    try {
      setLoading(true);
      const response = await openmrsFetch(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, makeRequest };
};
