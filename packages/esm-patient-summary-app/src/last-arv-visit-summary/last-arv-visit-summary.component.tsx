import React, { useEffect } from "react";
import styles from "./last-arv-visit-summary.scss";
import { useTranslation } from "react-i18next";
import { formatDate, useLayoutType } from "@openmrs/esm-framework";
import { StructuredListSkeleton, Tile } from "@carbon/react";
import useObservationData from "../hooks/useObservationData";
export interface lastArtVisitSummaryProps {
  patientUuid: string;
  code: string;
}
const lastArtVisitSummary: React.FC<lastArtVisitSummaryProps> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useObservationData(
    patientUuid
  );

  useEffect(() => {
    console.log(data);
  }, [])

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
        <div className={styles.container}>
          <div className={styles.content}>
            <p>{t("lastTBStatus", "Last TB status")}</p>
            <p>
              {" "}
              <span className={styles.value}>
                {(data.results[0]?.tbStatus)}
              </span>
            </p>
          </div>
          <div className={styles.content}>
            <p>{t("lastArvRegimenDose", "Last ARV Regimen Dose")}</p>
            <p>
              <span className={styles.value}>
                {(data.results[0]?.arvRegimenDose)}
              </span>
            </p>
          </div>
          <div className={styles.content}>
            <p>{t("nextVisitDate", "Next Visit Date")}</p>
            <p>
              <span className={styles.value}>
                ---
              </span>
            </p>
          </div>
          <div className={styles.content}>
            <p>{t("whoHivClinicalStage", "WHO HIV Clinical Stage")}</p>
            <p>
              <span className={styles.value}>
                {(data.results[0]?.whoClinicalStage)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default lastArtVisitSummary;
