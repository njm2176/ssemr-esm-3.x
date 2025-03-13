import React from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import usePatientNotifications from "../hooks/usePatientNotifications";
import styles from "./notification.scss";

export interface NotificationsProps {
  patientUuid: string;
  code: string;
}

const Notifications: React.FC<NotificationsProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const { notifications, isLoading, error } =
    usePatientNotifications(patientUuid);

  const customStyles = {
    rows: {
      style: { minHeight: "72px", fontSize: "14px", fontWeight: "1000" },
    },
    cells: { style: { padding: "10px" } },
  };

  const columns = [
    {
      name: "",
      selector: (row) => row.id,
      width: "50px",
    },
    { name: "", selector: (row) => row.message, wrap: true },
    { name: "", cell: (row) => row.icon, width: "50px" },
  ];

  if (error) {
    return <span>{t("errorPatientFlags", "Error loading patient flags")}</span>;
  }

  return (
    <div className={styles.datatable}>
      <DataTable
        columns={columns}
        data={notifications}
        customStyles={customStyles}
        noHeader
        striped
        progressPending={isLoading}
        progressComponent={
          <div className={styles.loading}>
            {t("loadingNotifications", "Loading notifications...")}
          </div>
        }
        noDataComponent={
          <div className={styles.emptyText}>
            {t("noNotifications", "No Notifications")}
          </div>
        }
      />
    </div>
  );
};

export default Notifications;
