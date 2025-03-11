import React from "react";
import { useTranslation } from "react-i18next";
import PatientFlag from "../patient-flags-components/patient-flag.component";
import Notifications from "../notification-component/notification.component";
import {
  getPatientUuidFromStore,
  CardHeader,
} from "@openmrs/esm-patient-common-lib";

const NotificationWorkspace: React.FC = () => {
  const { t } = useTranslation();
  const patientUuid = getPatientUuidFromStore();
  return (
    <div>
      <CardHeader
        title={t("patientFlags", "Patient Flags")}
        children={""}
      ></CardHeader>
      <PatientFlag patientUuid={patientUuid} />
      <CardHeader
        title={t("notification", "Notification")}
        children={""}
      ></CardHeader>
      <Notifications patientUuid={patientUuid} code="" />
    </div>
  );
};

export default NotificationWorkspace;
