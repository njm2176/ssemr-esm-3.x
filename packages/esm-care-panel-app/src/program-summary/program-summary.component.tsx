import React from "react";
import styles from "./program-summary.scss";
import { useTranslation } from "react-i18next";
import { formatDate, useLayoutType } from "@openmrs/esm-framework";
import { StructuredListSkeleton, Tile } from "@carbon/react";
import useObservationData from "../hooks/useObservationData";
import { RegimenType } from "../types";
export interface ProgramSummaryProps {
  patientUuid: string;
  code: string;
}
const ProgramSummary: React.FC<ProgramSummaryProps> = ({
  patientUuid,
  code,
}) => {
  const { data, isLoading, error, extractObservationData } = useObservationData(
    patientUuid,
    code
  );
  const { t } = useTranslation();

  const isTablet = useLayoutType() == "tablet";
  if (isLoading) {
    return (
      <Tile>
        <StructuredListSkeleton role="progressbar" />
      </Tile>
    );
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
              <p>{t("dateOfEnrollment", "Date of Enrollment")}</p>
              <p>{extractObservationData(data, "Date of enrollment")}</p>
            </div>
            <div className={styles.content}>
              <p>{t("latestArvRegimen", "Latest ARV Regimen")}</p>
              <p className={styles.value}>
                {extractObservationData(data, "ART Regimen")}
              </p>
            </div>
            <div className={styles.content}>
              <p>{t("lastCD4Count", "Last CD4 count")}</p>
              <p>
                <span className={styles.value}>
                  {extractObservationData(data, "CD4")}
                </span>
              </p>
            </div>
            <div className={styles.content}>
              <p>{t("bmiMuac", "BMI/MUAC")}</p>
              <p>
                <span className={styles.value}>
                  {extractObservationData(data, "Body mass index")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Tile>
    </>
  );
};
export default ProgramSummary;
