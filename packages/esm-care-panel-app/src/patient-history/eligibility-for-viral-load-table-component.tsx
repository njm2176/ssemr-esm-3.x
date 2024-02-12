import React from "react";
import styles from "./patient-history-component.scss";
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

  const headers = [
    {
      key: "eligibilityforvl",
      header: "Eligibility For Viral Load Sample Collection",
    },
    {
      key: "date",
      header: "Date",
    },
  ];

  const rows = [
    {
      id: "a",
      eligibilityforvl: eligibilityforvl,
      date: dateVlSampleCollected,
    },
  ];

  return (
    <>
      <DataTable rows={rows} headers={headers}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <Table {...getTableProps()}>
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
export default EligibilityForVL;
