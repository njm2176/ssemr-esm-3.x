import React, { useState } from "react";
import { openmrsFetch } from "@openmrs/esm-framework";
import useSWR from "swr";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const makeRequest = async (url, onResult) => {
    try {
      setLoading(true);
      const response = await openmrsFetch(url);
      const { data, error, isLoading } = useSWR(url, openmrsFetch, {});
      setData(data);
      onResult(data, null);
    } catch (error) {
      setError(error);
      onResult(null, error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, makeRequest };
};
