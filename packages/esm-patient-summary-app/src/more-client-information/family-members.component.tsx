import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import styles from "./more-info.scss";

export interface FamilyHistoryProps {
  patientUuid: string;
  code: string;
}

const FamilyHistory: React.FC<FamilyHistoryProps> = ({ code }) => {
  const [patientUuid, setPatientUuid] = useState("");

  const [loading, setLoading] = useState(false);

  const [patientData, setPatientData] = useState([]);

  const tableColumns = [
    {
      name: "Family Name",
      selector: (row) => row.familyName,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Weight(kg)",
      selector: (row) => row.weight,
    },
    {
      name: "HIV status",
      selector: (row) => row.hivStatus,
    },
  ];

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

  const getObservationData = async () => {
    try {
      setLoading(true);

      const {
        data: { results },
      } = await axios.get(
        `/openmrs/ws/rest/v1/obs?patient=${patientUuid}&_sort=-date&limit=100`
      );

      console.log("results", results);
      const formattedData = results
        .filter((item) => item.display.includes("General Family Information"))
        .map((result) => {
          const value = result.display.split(":")[1];
          const valueItems = value.split(",");
          return {
            weight: valueItems[0],
            hivStatus: valueItems[1],
            gender: valueItems[2],
            familyName: valueItems[3],
          };
        });

      setPatientData(formattedData);
    } catch (e) {
      console.error("error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientUuid) getObservationData();
  }, [patientUuid]);

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

  return (
    <div className={styles.datatable}>
      {patientData.length > 0 && (
        <DataTable
          columns={tableColumns}
          data={patientData}
          responsive
          pagination
          customStyles={customStyles}
          subHeader
          striped
          title="Family Members"
          fixedHeader
          pointerOnHover
        />
      )}
    </div>
  );
};
export default FamilyHistory;
