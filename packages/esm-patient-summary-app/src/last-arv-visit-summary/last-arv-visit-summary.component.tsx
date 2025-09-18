import React from "react";
import styles from "./last-arv-visit-summary.scss";
import { useTranslation } from "react-i18next";
import { StructuredListSkeleton } from "@carbon/react";
import useObservationData from "../hooks/useObservationData";
export interface lastArtVisitSummaryProps {
  patientUuid: string;
  code: string;
}
const LastArtVisitSummary: React.FC<lastArtVisitSummaryProps> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useObservationData(patientUuid);

  if (isLoading) {
    return <StructuredListSkeleton role="progressbar" />;
  }
  if (error) {
    return (
      <span>{t("errorProgramSummary", "Error loading ART Visit summary")}</span>
    );
  }
  if (Object.keys(data ?? {})?.length === 0) {
    return;
  }

  return (
    <>
      <div className={styles.card}>
        {data?.results && (
          <div className={styles.container}>
            <div className={styles.content}>
              <p>{t("dateOfEnrollment", "Date of Enrollment")}</p>
              <p>{data?.results[0]?.enrollmentDate}</p>
            </div>
            <div className={styles.content}>
              <p>{t("latestArvRegimen", "Latest ARV Regimen")}</p>
              <p className={styles.value}>{data.results[0]?.arvRegimen}</p>
            </div>
            <div className={styles.content}>
              <p>{t("lastArvRegimenDose", "Last ARV Regimen Dose")}</p>
              <p>
                <span className={styles.value}>
                  {data.results[0]?.arvRegimenDose}
                </span>
              </p>
            </div>
            <div className={styles.content}>
              <p>{t("whoHivClinicalStage", "WHO HIV Clinical Stage")}</p>
              <p>
                <span className={styles.value}>
                  {data.results[0]?.whoClinicalStage}
                </span>
              </p>
            </div>
            <div className={styles.content}>
              <p>{t("lastCD4Count", "Last CD4 count")}</p>
              <p>
                <span className={styles.value}>
                  {data.results[0]?.lastCD4Count
                    ? data.results[0]?.lastCD4Count
                    : "---"}
                </span>
              </p>
            </div>
            <div className={styles.content}>
              <p>{t("lastTBStatus", "Last TB status")}</p>
              <p>
                {" "}
                <span className={styles.value}>
                  {data.results[0]?.tbStatus}
                </span>
              </p>
            </div>
            <div className={styles.content}>
              <p>{t("tbNumber", "TB Number")}</p>
              <p>
                <span className={styles.value}>
                  {data.results[0]?.tbNumber
                    ? data.results[0]?.tbNumber
                    : "---"}
                </span>
              </p>
            </div>
            <div className={styles.content}>
              <p>{t("iitRecurrence", "Count of IIT")}</p>
              <p>
                <span className={styles.value}>
                  {data.results[0]?.iitRecurrence
                    ? data.results[0]?.iitRecurrence
                    : "---"}
                </span>
              </p>
            </div>
            <div className={styles.content}>
              <p>{t("hvlRecurrence", "Count of HVL")}</p>
              <p>
                <span className={styles.value}>
                  {data.results[0]?.hvlRecurrence
                    ? data.results[0]?.hvlRecurrence
                    : "---"}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LastArtVisitSummary;
