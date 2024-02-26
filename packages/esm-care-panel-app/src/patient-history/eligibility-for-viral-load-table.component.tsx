import React from "react";
import styles from "./patient-history.component.scss";
import { useTranslation } from "react-i18next";
import { formatDate, useLayoutType } from "@openmrs/esm-framework";
import {
  StructuredListSkeleton,
  Tile,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";
import { RegimenType } from "../types";
import useObservationData from "../hooks/useObservationData";

export interface PatientHistoryProps {
  patientUuid: string;
  code: string;
}
const EligibilityForVL: React.FC<PatientHistoryProps> = ({
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
      <Tile>
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
      </Tile>
    </>
  );
};
export default EligibilityForVL;
