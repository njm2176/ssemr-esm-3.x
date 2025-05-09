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
  const { data, error, isLoading } = useObservationData(patientUuid);
  const { flags } = usePatientData(patientUuid);
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
      <span>{t("errorPatientSummary", "Error loading Patient summary")}</span>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const vlStatus =
    data && data.results && data.results.length > 0
      ? data.results[0].vlStatus === "Unknown"
        ? "---"
        : data.results[0].vlStatus
      : "---";

      const vlDueDateStr = data?.results?.[0]?.vlDueDate;

      const parseDMY = (dateStr) => {
        if (!dateStr) return null;
        const [day, month, year] = dateStr.split("-");
        return new Date(Number(year), Number(month) - 1, Number(day));
      };

      const vlDueDate = parseDMY(vlDueDateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (vlDueDate) vlDueDate.setHours(0, 0, 0, 0);

      const hasDueFlag = flags.includes("DUE_FOR_VL");
      const isFutureDueDate = vlDueDate && vlDueDate > today;
      const isPastOrToday = vlDueDate && vlDueDate <= today;

      const isEligible = isPastOrToday && hasDueFlag;
      const tagType = isEligible ? "green" : "red";
      const tagText = isEligible ? "Eligible" : "Not Eligible";
      const dateLabel = isFutureDueDate ? "Next Due Date" : "Date";

  return (
    <>
      {data?.results && (
        <>
          <div className={styles.card}>
            <div className={styles.container}>
              <div className={styles.content}>
                <p>{t("dateVLRecieved", "Date Viral Load Results Received")}</p>
                <p>{data?.results[0]?.dateVLResultsReceived}</p>
              </div>
              <div className={styles.content}>
                <p>{t("lastVLResult", "Last VL Result")}</p>
                <p className={styles.value}>{data?.results[0]?.vlResults}</p>
              </div>
              <div className={styles.content}>
                <p>{t("vlStatus", "VL Status")}</p>
                <p>
                  <span className={styles.value}>{vlStatus}</span>
                </p>
              </div>
            </div>
          </div>
          <hr style={{ margin: "20px" }} />
          <div className={styles.card}>
            <div className={styles.container}>
              <div className={styles.content}>
                <p>
                  {t(
                    "eligibilityForVL",
                    "Eligibility For Viral Load Sample Collection"
                  )}
                </p>
                <Tag type={tagType} size="md">
                  {tagText}
                </Tag>
              </div>
              <div className={styles.content}></div>
              {vlDueDateStr && (
                <div className={styles.content}>
                  <p>{t("vlDueDateLabel", dateLabel)}</p>
                  <span className={styles.value}>{vlDueDateStr}</span>
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
