import React from "react";
import { useTranslation } from "react-i18next";
import { CardHeader } from "@openmrs/esm-patient-common-lib";
import styles from "./notification-panel.scss";
import Notifications from "../notifications/notifications.component";

interface NotificationsPanelProps {
  patientUuid: string;
  formEntrySub: any;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.widgetCard}>
        <CardHeader
          title={t("notifications", "Notifications")}
          children={""}
        ></CardHeader>
        <div style={{ width: "100%", minHeight: "5rem" }}>
          <Notifications patientUuid={patientUuid} code={""} />
        </div>
      </div>
    </>
  );
};

export default NotificationsPanel;
