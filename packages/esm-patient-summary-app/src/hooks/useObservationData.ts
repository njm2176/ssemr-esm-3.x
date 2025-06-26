import { useMemo } from 'react';
import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const useObservationData = (patientUuid, flags) => {
  const swrKey = patientUuid ? `/openmrs/ws/rest/v1/ssemr/dashboard/obs?patientUuid=${patientUuid}` : null;

  const { data, error, isLoading, mutate } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: true, 
    revalidateOnReconnect: true
  });

  const eligibilityDetails = useMemo(() => {
    const latestResult = data?.results?.[0];

    if (!latestResult || !flags) {
      return null;
    }

    const isPendingResults = latestResult.vlDueDate === "Pending Results";

    if (isPendingResults) {
      return {
        tagType: "gray",
        tagText: "Pending VL Results",
        dateLabel: null,
        displayDate: null,
      };
    }

    const parseDMY = (dateStr) => {
      if (!dateStr) return null;
      const [day, month, year] = dateStr.split("-");
      return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
    };

    const vlDueDate = parseDMY(latestResult.vlDueDate);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const hasDueFlag = flags.includes("DUE_FOR_VL");
    const isFutureDueDate = vlDueDate && vlDueDate > today;
    const isPastOrToday = vlDueDate && vlDueDate <= today;
    const isEligible = isPastOrToday && hasDueFlag;

    return {
      tagType: isEligible ? "green" : "red",
      tagText: isEligible ? "Eligible" : "Not Eligible",
      dateLabel: isFutureDueDate ? "Next Due Date" : "Date",
      displayDate: latestResult.vlDueDate,
    };
  }, [data, flags]);

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
    eligibilityDetails,
    defaultFamilyTableHeaders,
    defaultIndexTableHeaders,
    defaultCHWHeaders,
  };
};

export default useObservationData;