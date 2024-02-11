import React from "react";
import styles from "./patient-history-component.scss";
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

  const vlDate = extractObservationData(data, "Date VL Sample Collected");
  const vlResult = extractObservationData(data, "Viral Load result");
  let vlStatus = "---";

  if (typeof vlResult === "number") {
    vlStatus = vlResult >= 1000 ? "Unsuppressed" : "Suppressed";
  }

  console.log("vlDate:", vlDate);
  console.log("vlResult:", vlResult);

  const headers = [
    {
      key: "date",
      header: "Date",
    },
    {
      key: "lastvlresult",
      header: "Last VL Result",
    },
    {
      key: "vlstatus",
      header: "VL Status",
    },
  ];

  const rows = [
    {
      id: "a",
      date: vlDate,
      lastvlresult: typeof vlResult === "number" ? vlResult : "---",
      vlstatus: vlStatus,
    },
  ];

  console.log("rows:", rows);

  return (
    <>
      <DataTable rows={rows} headers={headers}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <Table {...getTableProps()} style={{ marginBottom: "1rem" }}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </>
  );
};
export default VLStatus;
