import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPatientUuidFromStore, useLaunchWorkspaceRequiringVisit } from "@openmrs/esm-patient-common-lib";
import usePatientNotifications from "../hooks/usePatientNotifications";
import NotificationActionButton from "../notification-action-button/notification-action-button.extension";
import { ActionableNotification } from "@carbon/react";


const NotificationToastWrapper: React.FC = () => {
  const { t } = useTranslation();
  const patientUuid = getPatientUuidFromStore();
  const { notifications } = usePatientNotifications(patientUuid);
  const [showToast, setShowToast] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const launchNotificationWorkSpace = useLaunchWorkspaceRequiringVisit("notifications");

  useEffect(() => {
    if (notifications.length > 0) {
      setShowToast(true);
    }
  }, [notifications]);

  return (
    <>
      {showToast && (
        <div
          style={{
            position: "absolute",
            zIndex: 9999,
            marginTop: "5px",
            right: buttonRef.current?.offsetLeft ?? 0,
            top: buttonRef.current?.offsetTop ?? 0,
            transform: "translateY(-120%)",
          }}
        >
           <ActionableNotification
            kind="error"
            lowContrast={false}
            title={t("notificationsAlert", "Patient Notifications")}
            subtitle={t("notificationsSubtitle", "This patient has notifications that need your attention.")}
            actionButtonLabel={t("viewNotifications", "View Notifications")}
            onActionButtonClick={() => {
              setShowToast(false);
              launchNotificationWorkSpace();
            }}
            onClose={() => setShowToast(false)}
            timeout={0}
          />
        </div>
      )}

      <div ref={buttonRef}>
        <NotificationActionButton />
      </div>
    </>
  );
};

export default NotificationToastWrapper;