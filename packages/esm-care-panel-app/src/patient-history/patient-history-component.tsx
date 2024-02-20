import React from "react";
import styles from "./patient-history-component.scss";
import { useTranslation } from "react-i18next";
import { formatDate, useLayoutType } from "@openmrs/esm-framework";
import { Tile, StructuredListSkeleton } from "@carbon/react";
import VLStatus from "./vl-status-component";
import EligibilityForVL from "./eligibility-for-viral-load-table-component";
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
  const { data, isLoading, error, extractObservationData } = useObservationData(
    patientUuid,
    code
  );

  if (isLoading) {
    return <StructuredListSkeleton role="progressbar" />;
  }

  if (error) {
    return (
      <span>{t("errorPatientSummary", "Error loading Patient summary")}</span>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return null;
  }
  return (
    <>
      <Tile>
        <div className={styles.card}>
          <div className={styles.container}>
            <div className={styles.content}>
              <p>{t("lastArvRefillDate", "Last ARV Refill Date")}</p>
              <p>
                {" "}
                <span className={styles.value}>
                  {extractObservationData(data, "Date VL Sample Collected?")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Tile>
      <Tile>
        <div className={styles.card}>
          <div className={styles.desktopHeading}>
            <h5 className={styles.title}>
              {t("viralLoadHistory", "Viral Load History")}
            </h5>
          </div>
          <VLStatus patientUuid={""} code={""} />
        </div>
      </Tile>
      <Tile>
        <div className={styles.card}>
          <EligibilityForVL patientUuid={""} code={""} />
        </div>
      </Tile>
    </>
  );
};
export default PatientHistoryComponent;
