import { useMemo, useCallback, useEffect, useState } from "react";
import { openmrsFetch } from "@openmrs/esm-framework";
import useSWRInfinite from 'swr/infinite';

// This hook's only job is to fetch and cache all data for a given category.
export const useAutomaticPaginatedFetch = (category) => {
  const [pagination] = useState({ size: 15 });

  const startDate = useMemo(() => `${new Date().getFullYear()}-01-01`, []);
  const endDate = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  }, []);

  const fetcher = useCallback(async (url) => {
    const response = await openmrsFetch(url);
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  }, []);

  const getKey = useCallback((pageIndex, previousPageData) => {
    if (!category) return null;
    if (previousPageData && (!previousPageData.results || previousPageData.results.length === 0)) {
      return null;
    }
    return `/ws/rest/v1/ssemr/dashboard/${category}?startDate=${startDate}&endDate=${endDate}&page=${pageIndex}&size=${pagination.size}`;
  }, [category, startDate, endDate, pagination.size]);

  const {
    data: swrPages,
    error,
    isLoading: isInitialLoading,
    isValidating,              
    size,
    setSize,
  } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 600000,
  });

  const tableData = useMemo(() => swrPages?.flatMap(page => page.results || []) || [], [swrPages]);
  
  const isDone = useMemo(() => {
    if (!swrPages) return false;
    const lastPage = swrPages[swrPages.length - 1];
    return lastPage && lastPage.results && lastPage.results.length < pagination.size;
  }, [swrPages, pagination.size]);

  useEffect(() => {
    if (!isDone && !isValidating && swrPages) {
      setSize(size + 1);
    }
  }, [isDone, isValidating, size, setSize, swrPages]);

  return {
    data: tableData,
    isLoading: isInitialLoading,
    isFetchingMore: !isInitialLoading && isValidating,
    error,
  };
};