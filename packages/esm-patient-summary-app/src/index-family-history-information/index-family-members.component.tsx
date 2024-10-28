import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import styles from "./more-info.scss";
import useObservationData from "../hooks/useObservationData";

export interface IndexFamilyHistoryProps {
  patientUuid: string;
  code: string;
}

const IndexFamilyHistory: React.FC<IndexFamilyHistoryProps> = ({ code }) => {
  const [patientUuid, setPatientUuid] = useState("");

  const [loading, setLoading] = useState(false);

  const [patientData, setPatientData] = useState([]);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const { data, defaultIndexTableHeaders } = useObservationData(patientUuid)

  const getPatientUuid = () => {
    const currentUrl = window.location.href;

    // Regular expression to match UUID pattern
    const uuidRegex = /\/patient\/([a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8})\//;
    const match = uuidRegex.exec(currentUrl);

    const uuid = match ? match[1] : null;

    setPatientUuid(uuid);
  };

  useEffect(() => {
    getPatientUuid();
  }, []);

  // const getObservationData = async () => {
  //   try {
  //     setLoading(true);

  //     // const {
  //     //   data: { results },
  //     // } = await axios.get(
  //     //   `/openmrs/ws/rest/v1/obs?patient=${patientUuid}&_sort=-date&limit=100`
  //     // );
  //     const results = data

  //     console.log(results)
  //     const generalInfoArray = [];

  //     for (let i = 0; i < results.results.length - 1; i++) {
  //       if (results.results.length > 0) {
  //         generalInfoArray.push(results.results.indexFamilyMembers);
  //       }
  //     }

  //     console.log(results)

  //     for (let i = 0; i < generalInfoArray.length - 1; i++) {
  //       const subArray = results.results.slice(generalInfoArray[i].index + 1);
  //       const valuesArray = generalInfoArray[i].display.split(",");
  //       const valueObject = {};

  //       for (let j = 0; j < valuesArray.length - 1; j++) {
  //         const matchingItem = subArray.find((item) =>
  //           item.display.includes(valuesArray[j])
  //         );

  //         valueObject[matchingItem.display.split(":")[0]] =
  //           matchingItem.display.split(":")[1];

  //         setColumns((prevState) =>
  //           prevState.some(
  //             (item) => item.name === matchingItem.display.split(":")[0]
  //           )
  //             ? prevState
  //             : [
  //                 ...prevState,
  //                 {
  //                   name: matchingItem.display.split(":")[0],
  //                   selector: (row) => row[matchingItem.display.split(":")[0]],
  //                 },
  //               ]
  //         );
  //       }
  //       setRows((prev) => [...prev, valueObject]);
  //     }

  //     const formattedData = results.filter((item) =>
  //       item.display.includes("General Family Information")
  //     );

  //     setPatientData(formattedData);
  //   } catch (e) {
  //     console.error("error", e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const getObservationData = () => {
  //   if (data && data.results && data.results.length > 0) {
  //     setLoading(true);

  //     const allFamilyMembers = data.results.flatMap(
  //       (result) => result.familyMembers || []
  //     );

  //     console.log(allFamilyMembers)

  //     if (allFamilyMembers.length > 0) {
  //       const generatedColumns = Object.keys(allFamilyMembers[0]).map((key) => ({
  //         name: key.charAt(0).toUpperCase() + key.slice(1),
  //         selector: (row) => row[key],
  //       }));
  //       setColumns(generatedColumns);
  //       setRows(allFamilyMembers);
  //     }
  //     setLoading(false);
  //   }
  // }

  // const getObservationData = () => {
  //   setLoading(true);

  //   // Dummy data for testing
  //   const dummyData = [
  //     {
  //       name: "Achol Garang",
  //       age: 26,
  //       sex: "Female",
  //       hivStatus: "Positive",
  //       artNumber: null,
  //     },
  //     {
  //       name: "John Doe",
  //       age: 30,
  //       sex: "Male",
  //       hivStatus: "Negative",
  //       artNumber: "12345ART",
  //     },
  //   ];

  //   if (dummyData.length > 0) {
  //     const generatedColumns = Object.keys(dummyData[0]).map((key) => ({
  //       name: key.charAt(0).toUpperCase() + key.slice(1),
  //       selector: (row) => row[key],
  //     }));
  //     setColumns(generatedColumns);
  //     setRows(dummyData);
  //   }

  //   setLoading(false);
  // };

  const getObservationData = () => {
    if (data && data.results && data.results.length > 0) {
      setLoading(true)

      const allFamilyMembers = data.results.flatMap(
        (result) => result.indexFamilyMembers || []
      );

      if (allFamilyMembers.length > 0) {
        setColumns(defaultIndexTableHeaders);
  
        setRows(allFamilyMembers);
      } else {
        console.log("No family members found in the data");
      }

      setLoading(false)
    } else {
      console.log("Data is empty or not yet available");
    }
  }

  useEffect(() => {
    if (data) getObservationData();
  }, [data]);

  const customStyles = {
    cells: {
      style: {
        minHeight: "72px",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    headCells: {
      style: {
        fontSize: ".9rem",
        fontWeight: "600",
      },
    },
  };

  console.log("columns", columns)
  console.log("rows", rows)

  return (
    <div className={styles.datatable}>
        <DataTable
          columns={columns}
          data={rows}
          responsive
          pagination
          customStyles={customStyles}
          striped
          fixedHeader
          pointerOnHover
          noDataComponent={
            <div className={styles.emptyText}>No Index Family Members Found</div>
          }
        />
    </div>
  );
};
export default IndexFamilyHistory;
