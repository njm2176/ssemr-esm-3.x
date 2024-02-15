import React from "react";
import styles from "../program-summary/program-summary.scss";
import { useTranslation } from "react-i18next";
import { formatDate, useLayoutType } from "@openmrs/esm-framework";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  StructuredListSkeleton,
} from "@carbon/react";
import { RegimenType } from "../types";
import useObservationData from "../hooks/useObservationData";
import { Tile } from "@carbon/react";

export interface PatientHistoryProps {
  patientUuid: string;
  code: string;
}
const VLStatus: React.FC<PatientHistoryProps> = ({ patientUuid, code }) => {
  const { t } = useTranslation();
  const { data, isLoading, error, extractObservationData } = useObservationData(
    patientUuid,
    code
  );

  console.log("VL Data:", data);

  if (isLoading) {
    return <StructuredListSkeleton role="progressbar" />;
  }

  if (error) {
    return (
      <span>
        {t("errorViralLoadSummary", "Error loading Viral Load summary")}
      </span>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const vlDate = extractObservationData(data, "Date VL Sample Collected?");
  const vlResult = extractObservationData(data, "HIVTC, Viral Load");
  let vlStatus = "---";

  if (typeof vlResult === "number") {
    vlStatus = vlResult >= 1000 ? "Unsuppressed" : "Suppressed";
  }

  // const headers = [
  //   {
  //     key: "date",
  //     header: "Date",
  //   },
  //   {
  //     key: "lastvlresult",
  //     header: "Last VL Result",
  //   },
  //   {
  //     key: "vlstatus",
  //     header: "VL Status",
  //   },
  // ];

  // const rows = [
  //   {
  //     id: "a",
  //     date: vlDate,
  //     lastvlresult: typeof vlResult === "number" ? vlResult : "---",
  //     vlstatus: vlStatus,
  //   },
  // ];

  return (
    <>
      <Tile>
        <div className={styles.card}>
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
      </Tile>
    </>
  );
};
export default VLStatus;
