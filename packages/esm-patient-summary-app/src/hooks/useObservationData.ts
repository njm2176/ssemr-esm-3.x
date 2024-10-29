import { useState, useEffect } from "react";

const useObservationData = (patientUuid) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/openmrs/ws/rest/v1/ssemr/dashboard/obs?patientUuid=${patientUuid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching observation data:", error);
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [patientUuid]);

  const defaultFamilyTableHeaders = [
    {
      name: "Name",
      selector: (row) => row.name || "---"
    },
    {
      name: "Age",
      selector: (row) => row.age || "---"
    },
    {
      name: "Sex",
      selector: (row) => row.sex || "---"
    },
    {
      name: "HIV Status",
      selector: (row) => row.hivStatus || "---"
    },
    {
      name: "Unique ART No.",
      selector: (row) => row.artNumber || "---"
    }
  ]

  const defaultIndexTableHeaders = [
    {
      name: "Name",
      selector: (row) => row.name || "---"
    },
    {
      name: "Age",
      selector: (row) => row.age || "---"
    },
    {
      name: "Sex",
      selector: (row) => row.sex || "---"
    },
    {
      name: "Relationship",
      selector: (row) => row.relationship || "---"
    },
    {
      name: "HIV Status",
      selector: (row) => row.hivStatus || "---"
    },
    {
      name: "Phone No.",
      selector: (row) => row.phone || "---"
    },
    {
      name: "Unique ART No.",
      selector: (row) => row.uniqueArtNumber || "---"
    }
  ]

  // const extractObservationData = (data, keyword) => {
  //   if (data && data.results) {
  //     const observation = data.results.find((entry) =>
  //       entry.results
  //     );
  //     return observation ? observation : "---";
  //   } else {
  //     return "No observation Found";
  //   }
  // };

  return { data, isLoading, setIsLoading, error, defaultFamilyTableHeaders, defaultIndexTableHeaders };
};

export default useObservationData;
