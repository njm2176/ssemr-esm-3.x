import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const useObservationData = (patientUuid) => {
  const swrKey = patientUuid ? `/openmrs/ws/rest/v1/ssemr/dashboard/obs?patientUuid=${patientUuid}` : null;

  const { data, error, isLoading, mutate } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: true, 
    revalidateOnReconnect: true,
    // refreshInterval: 5000,                             
    // onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    //   if (retryCount >= 3) return;
    //   setTimeout(() => revalidate(), 5000);
    // }
  });

  return {
    data,
    isLoading,
    error,
    refetch: mutate,
  };
};

export default useObservationData;