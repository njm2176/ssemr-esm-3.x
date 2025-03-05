import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useObservationData from "../hooks/useObservationData";
import styles from "./notifications.scss";
import { Warning } from "@carbon/react/icons";

export interface NotificationsProps {
  patientUuid: string;
  code: string;
}

const Notifications: React.FC<NotificationsProps> = ({ patientUuid }) => {
  const { data } = useObservationData(patientUuid);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!data || !data.results) return;
    const notifications = [];
    let count = 1;
    const observation = data.results[0];

    if (!observation) return;

    if (observation.cd4Done === null) {
      notifications.push({
        id: count++,
        message: "Perform a CD4 test for the patient.",
        icon: <Warning className={styles.mustardTag} />,
      });
    }

    if (observation.vlResults && parseFloat(observation.vlResults) > 1000) {
      notifications.push({
        id: count++,
        message:
          "Patient's viral load is unsuppressed. Consider adherence counseling and possible regimen change.",
        icon: <Warning className={styles.mustardTag} />,
      });
    }

    if (
      observation.tbStatus &&
      observation.tbStatus === "ND - TB Screening not done"
    ) {
      notifications.push({
        id: count++,
        message: "Perform a TB screening for the patient.",
        icon: <Warning />,
      });
    }

    if (
      observation.tbStatus &&
      observation.tbStatus === "Pr TB - Presumptive TB"
    ) {
      notifications.push({
        id: count++,
        message: "Presumptive TB, test for Urine LAM / GeneXpert.",
        icon: <Warning className={styles.mustardTag} />,
      });
    }

    if (
      observation.whoStage &&
      (observation.whoStage === 3 || observation.whoStage === 4)
    ) {
      notifications.push({
        id: count++,
        message: "Risk of cryptococcal Meningitis, test for sCrAg.",
        icon: <Warning className={styles.mustardTag} />,
      });
    }

    setRows(notifications);
  }, [data]);

  const customStyles = {
    rows: { style: { minHeight: "72px", fontSize: "14px", fontWeight: "500" } },
    cells: { style: { padding: "10px" } },
  };

  const columns = [
    { name: "", selector: (row) => row.id, width: "50px" },
    { name: "", selector: (row) => row.message, wrap: true },
    { name: "", selector: (row) => row.icon, width: "50px" },
  ];

  return (
    <div className={styles.datatable}>
      <DataTable
        columns={columns}
        data={rows}
        customStyles={customStyles}
        noHeader
        striped
        pagination
        noDataComponent={
          <div className={styles.emptyText}>No Notifications</div>
        }
      />
    </div>
  );
};

export default Notifications;
