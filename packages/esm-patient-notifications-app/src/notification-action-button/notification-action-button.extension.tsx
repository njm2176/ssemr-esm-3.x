import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ActionMenuButton, launchWorkspace } from "@openmrs/esm-framework";
import { Notification } from "@carbon/react/icons";
import { getPatientUuidFromStore } from "@openmrs/esm-patient-common-lib";
import usePatientNotifications from "../hooks/usePatientNotifications";
import styles from "./notification.scss";

const NotificationActionButton: React.FC = () => {
  const { t } = useTranslation();
  const launchNotificationWorkSpace = useCallback(() => {
    launchWorkspace("notifications");
  }, []);

  const patientUuid = getPatientUuidFromStore();
  const { notifications } = usePatientNotifications(patientUuid);

  const hasNotifications = notifications?.length > 0;

  return (
    <div className={hasNotifications ? styles.glowButton : ""}>
      <ActionMenuButton
        getIcon={() => <Notification />}
        label={t("notifiations", "Notifications")}
        iconDescription={t("notifications", "Notifications")}
        handler={launchNotificationWorkSpace}
        type="button"
        tagContent={hasNotifications ? notifications.length : null}
      />
    </div>
  );
};

export default NotificationActionButton;
