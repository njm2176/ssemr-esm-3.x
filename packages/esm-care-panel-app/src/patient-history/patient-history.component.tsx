import React from "react";
import styles from "./patient-history.component.scss";
import { useTranslation } from "react-i18next";
import { formatDate, useLayoutType } from "@openmrs/esm-framework";
import { Tile, StructuredListSkeleton } from "@carbon/react";
import VLStatus from "./vl-status.component";
import EligibilityForVL from "./eligibility-for-viral-load-table.component";
import LastArvRefillDate from "./last-arv-refill-date.component";
import useObservationData from "../hooks/useObservationData";

export interface PatientHistoryProps {
  patientUuid: string;
  code: string;
}
const PatientHistoryComponent: React.FC<PatientHistoryProps> = ({
  patientUuid,
  code,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <LastArvRefillDate patientUuid={""} code={""} />
      <VLStatus patientUuid={""} code={""} />
      <EligibilityForVL patientUuid={""} code={""} />
    </>
  );
};
export default PatientHistoryComponent;
