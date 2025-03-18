import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { getPatientUuidFromStore } from "@openmrs/esm-patient-common-lib";
import usePatientNotifications from "../hooks/usePatientNotifications";
import NotificationActionButton from "./notification-action-button.extension"

const NotificationProfileWrapper: React.FC = () => {
  const patientUuid = getPatientUuidFromStore();
  const { notifications } = usePatientNotifications(patientUuid);
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    if (notifications.length > 0) {
      setRunTour(true); // Trigger Joyride when there are notifications
    }
  }, [notifications]);

  const steps: Step[] = [
    {
      target: '[data-testid="notification-alert-button"]', // Select via data-testid
      content:
        "This patient has important notifications. Click here to review them.",
      placement: "bottom-start", // Valid placement
      disableBeacon: true,
    },
  ];

  const handleTourCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRunTour(false);
    }
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        callback={handleTourCallback}
        styles={{
          options: {
            zIndex: 10000,
            arrowColor: "#fff",
            backgroundColor: "#fff",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            primaryColor: "#0f62fe",
            textColor: "#161616",
          },
        }}
      />
      {/* Render the button normally */}
      <NotificationActionButton />
    </>
  );
};

export default NotificationProfileWrapper;