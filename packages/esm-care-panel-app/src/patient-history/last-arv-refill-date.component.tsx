import React from "react";
import styles from "./patient-history.component.scss";
import { useTranslation } from "react-i18next";
import { formatDate, useLayoutType } from "@openmrs/esm-framework";
import { Tile, StructuredListSkeleton } from "@carbon/react";
import usePatientHistory from "../hooks/usePatientHistory";

export interface lastArvRefillProps {
  patientUuid: string;
  code: string;
}
const LastArvRefillDate: React.FC<lastArvRefillProps> = ({
  patientUuid,
  code,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error, extractObservationData } = usePatientHistory(
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
    </>
  );
};
export default LastArvRefillDate;
