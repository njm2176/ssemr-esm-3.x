import React from "react";
import styles from "./vl-summary.scss";
import { useTranslation } from "react-i18next";
import { formatDate, useLayoutType } from "@openmrs/esm-framework";
import { StructuredListSkeleton, Tile } from "@carbon/react";
import useObservationData from "../hooks/useObservationData";
import { RegimenType } from "../types";
export interface ProgramSummaryProps {
  patientUuid: string;
  code: string;
}
const ViralLoadlHistory: React.FC<ProgramSummaryProps> = ({
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

  const vlDate = extractObservationData(
    data,
    "Date Viral Load Results Received"
  );
  const vlResult = extractObservationData(data, "Viral Load");
  let vlStatus;

  if (typeof vlResult !== "undefined") {
    vlStatus = vlResult >= 1000 ? "Unsuppressed" : "Suppressed";
  } else {
    vlStatus = "---";
  }

  const dateVlSampleCollected = extractObservationData(
    data,
    "Date Viral Load Results Received"
  );

  const sixMonthsInMs = 6 * 30 * 24 * 60 * 60 * 1000;
  const currentDate = new Date();
  const sampleCollectionDate = new Date(dateVlSampleCollected);
  const timeDifference = currentDate.getTime() - sampleCollectionDate.getTime();
  const monthsDifference = timeDifference / sixMonthsInMs;
  const eligibilityforvl = monthsDifference >= 6 ? "Eligible" : "Not Eligible";

  return (
    <>
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
      <div className={styles.card}>
        <div className={styles.desktopHeading}>
          <h6 className={styles.title}>
            {t("vlHistory", "Viral Load History")}
          </h6>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            <p>{t("date", "Date")}</p>
            <p>{vlDate}</p>
          </div>
          <div className={styles.content}>
            <p>{t("lastVLResult", "Last VL Result")}</p>
            <p className={styles.value}>{vlResult}</p>
          </div>
          <div className={styles.content}>
            <p>{t("vlStatus", "VL Status")}</p>
            <p>
              <span className={styles.value}>{vlStatus}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.container}>
          <div className={styles.content}>
            <p>
              {t(
                "eligibilityForVL",
                "Eligibility For Viral Load Sample Collection"
              )}
            </p>
            <p>{eligibilityforvl}</p>
          </div>
          <div className={styles.content}></div>
          <div className={styles.content}>
            <p>{t("date", "Date")}</p>
            <p className={styles.value}>{dateVlSampleCollected}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViralLoadlHistory;
