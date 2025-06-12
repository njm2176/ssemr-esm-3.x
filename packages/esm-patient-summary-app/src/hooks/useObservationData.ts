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

  const defaultFamilyTableHeaders = [
    {
      name: "Name",
      selector: (row) => row.name || "---",
    },
    {
      name: "Age",
      selector: (row) => row.age || "---",
    },
    {
      name: "Sex",
      selector: (row) => row.sex || "---",
    },
    {
      name: "HIV Status",
      selector: (row) => row.hivStatus || "---",
    },
    {
      name: "Unique ART No.",
      selector: (row) => row.artNumber || "---",
    },
  ];

  const defaultIndexTableHeaders = [
    {
      name: "Name",
      selector: (row) => row.name || "---",
    },
    {
      name: "Age",
      selector: (row) => row.age || "---",
    },
    {
      name: "Sex",
      selector: (row) => row.sex || "---",
    },
    {
      name: "Relationship",
      selector: (row) => row.relationship || "---",
    },
    {
      name: "HIV Status",
      selector: (row) => row.hivStatus || "---",
    },
    {
      name: "Phone No.",
      selector: (row) => row.phone || "---",
    },
    {
      name: "Unique ART No.",
      selector: (row) => row.uniqueArtNumber || "---",
    },
  ];

  const defaultCHWHeaders = [
    {
      name: "Cadre",
      selector: (row) => row.cadre || "---",
    },
    {
      name: "Name",
      selector: (row) => row.name || "---",
    },
    {
      name: "Phone",
      selector: (row) => row.phone || "---",
    },
    {
      name: "Address",
      selector: (row) => row.address || "---",
    }
  ]

  return {
    data,
    isLoading,
    error,
    refetch: mutate,
    defaultFamilyTableHeaders,
    defaultIndexTableHeaders,
    defaultCHWHeaders,
  };
};

export default useObservationData;