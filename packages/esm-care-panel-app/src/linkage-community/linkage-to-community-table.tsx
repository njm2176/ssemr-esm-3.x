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

  // Define headers
  const headers = [
    {
      key: "name",
      header: "Name of the Community Health Worker (CHW)",
    },
    {
      key: "phone",
      header: "Telephone Number",
    },
    {
      key: "landmark",
      header: "LandMark/Address Of Community Health Worker (CHW)",
    },
  ];

  const chwPhoneNumber = extractObservationData(data, "CHW Phone number");
  const chwName = extractObservationData(data, "Name of the COV assigned");
  const chwAddress = extractObservationData(data, "CHW Address");

  const rows = [
    {
      id: "a",
      name: chwName,
      phone: chwPhoneNumber,
      landmark: chwAddress,
    },
  ];

  return (
    <>
      {isLoading ? (
        <StructuredListSkeleton />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
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
      )}
    </>
  );
};

export default LinkageToCHWTable;
