import React from "react";
import styles from "./vl-summary.scss";
import { useTranslation } from "react-i18next";
import { StructuredListSkeleton, Tag, Tile } from "@carbon/react";
import useObservationData from "../hooks/useObservationData";
import usePatientData from "../hooks/usePatientData";
export interface ProgramSummaryProps {
  patientUuid: string;
  code: string;
}
const ViralLoadlHistory: React.FC<ProgramSummaryProps> = ({ patientUuid }) => {
  const { flags } = usePatientData(patientUuid);
  const { data, error, isLoading, eligibilityDetails } = useObservationData(patientUuid, flags);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Tile>
        <StructuredListSkeleton role="progressbar" />
      </Tile>
    );
  }

  if (error) {
    return (
      <span style={{ color: "red" }}>
        {t("errorPatientSummary", "Error loading Patient summary")}
      </span>
    );
  }

  const latestResult = data?.results?.[0];

  if (!latestResult || !eligibilityDetails) {
    return null;
  }

  const isPendingResults = latestResult.vlDueDate === "Pending Results";
  const vlStatus = latestResult.vlStatus === "Unknown" ? "---" : latestResult.vlStatus || "---";

  return (
    <>
      {data?.results && (
        <>
          <div className={styles.card}>
            <div className={styles.container}>
              <div className={styles.content}>
                <p>{t("dateVLCollected", "Date Viral Load Sample Collected")}</p>
                <p>{data?.results[0]?.dateVLSampleCollected}</p>
              </div>
              {isPendingResults ? (
                <div className={styles.content}>
                  <p>{t("status", "Status")}</p>
                  <p className={styles.value}>{t("pendingVLResults", "Pending VL Results")}</p>
                </div>
              ) : (
                <>
                  <div className={styles.content}>
                    <p>{t("dateVLRecieved", "Date Viral Load Results Received")}</p>
                    <p>{latestResult.dateVLResultsReceived || "---"}</p>
                  </div>
                  <div className={styles.content}>
                    <p>{t("lastVLResult", "Last VL Result")}</p>
                    <p className={styles.value}>{latestResult.vlResults || "---"}</p>
                  </div>
                  <div className={styles.content}>
                    <p>{t("vlStatus", "VL Status")}</p>
                    <p><span className={styles.value}>{vlStatus}</span></p>
                  </div>
                </>
              )}
            </div>
          </div>
          <hr style={{ margin: "20px" }} />
          <div className={styles.card}>
            <div className={styles.container}>
              <div className={styles.content}>
                <p>{t("eligibilityForVL", "Eligibility For Viral Load Sample Collection")}</p>
                <Tag type={eligibilityDetails.tagType} size="md">
                  {eligibilityDetails.tagText}
                </Tag>
              </div>
              <div className={styles.content}></div>
              {eligibilityDetails.displayDate && (
                <div className={styles.content}>
                  <p>{eligibilityDetails.dateLabel}</p>
                  <span className={styles.value}>{eligibilityDetails.displayDate}</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ViralLoadlHistory;
