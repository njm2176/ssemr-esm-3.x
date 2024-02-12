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
import { RegimenType } from "../types";

export interface PatientHistoryProps {
  patientUuid: string;
  programName: string;
}
const RedFlags: React.FC<PatientHistoryProps> = ({
  patientUuid,
  programName,
}) => {
  const { t } = useTranslation();

  const headers = [
    {
      key: "redFlags",
      header: "Client Red Flags",
    },
  ];

  const rows = [
    {
      id: "a",
      redFlags: "Client has no Red Flags",
    },
  ];

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
export default RedFlags;
