import React from "react";
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
import useObservationData from "../hooks/useObservationData";
import styles from "../program-summary/program-summary.scss";

export interface PatientHistoryProps {
  patientUuid: string;
  code: string;
}
const LinkageToCHWTable: React.FC<PatientHistoryProps> = ({
  patientUuid,
  code,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error, extractObservationData } = useObservationData(
    patientUuid,
    code
  );

  const isTablet = useLayoutType() == "tablet";
  if (isLoading) {
    return <StructuredListSkeleton role="progressbar" />;
  }
  if (error) {
    return (
      <span>
        {t(
          "errorCommunityHealthWorker",
          "Error loading Community Health Worker"
        )}
      </span>
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
            <p style={{ marginRight: "15px" }}>
              {t("nameOfCHW", "Name of the Community Health Worker (CHW)")}
            </p>
            <p>{extractObservationData(data, "Name of the COV assigned")}</p>
          </div>
          <div className={styles.content}>
            <p>{t("telephoneNumber", "Telephone Number")}</p>
            <p className={styles.value}>
              {extractObservationData(data, "CHW Phone number")}
            </p>
          </div>
          <div className={styles.content}>
            <p>
              {t(
                "chwAddress",
                "LandMark/Address Of Community Health Worker (CHW)"
              )}
            </p>
            <p>
              <span className={styles.value}>
                {extractObservationData(data, "CHW Address")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkageToCHWTable;
