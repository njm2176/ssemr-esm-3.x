import React from "react";
import { useTranslation } from "react-i18next";
import { ActionMenuButton } from "@openmrs/esm-framework";
import { Notification } from "@carbon/react/icons";
import {
  useLaunchWorkspaceRequiringVisit,
  getPatientUuidFromStore,
} from "@openmrs/esm-patient-common-lib";
import usePatientNotifications from "../hooks/usePatientNotifications";

const NotificationActionButton: React.FC = () => {
  const { t } = useTranslation();
  const launchNotificationWorkSpace =
    useLaunchWorkspaceRequiringVisit("notifications");

  const patientUuid = getPatientUuidFromStore();
  const { notifications } = usePatientNotifications(patientUuid);

  return (
    <ActionMenuButton
      data-testid="notification-alert-button"
      getIcon={() => <Notification />}
      label={t("notifiations", "Notifications")}
      iconDescription={t("notifications", "Notifications")}
      handler={launchNotificationWorkSpace}
      type={"button"}
      tagContent={notifications?.length > 0 ? notifications?.length : null}
    />
  );
};

export default NotificationActionButton;
