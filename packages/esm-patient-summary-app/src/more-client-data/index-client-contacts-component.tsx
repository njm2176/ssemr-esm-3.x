import React, { useEffect, useState } from "react";
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
import useObservationData from "../hooks/useObservationData";

export interface PatientHistoryProps {
  patientUuid: string;
  programName: string;
}

const IndexClientContacts: React.FC<PatientHistoryProps> = ({
  patientUuid,
  programName,
}) => {
  const { t } = useTranslation();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data, extractObservationData } = useObservationData(
    patientUuid,
    "General Family Information"
  );

  useEffect(() => {
    if (data) {
      setIsLoading(true);
      const members = [];
      for (let i = 0; i < data.results.length; i++) {
        const observation = data.results[i];
        const member = {
          id: observation.uuid,
          name: extractObservationData(observation, "Individual Name"),
          gender: extractObservationData(observation, "Family Member - Sex"),
          hivStatus: extractObservationData(
            observation,
            "Family Member - HIV Status"
          ),
        };
        members.push(member);
      }
      setFamilyMembers(members);
      console.log("Family members", members);
      setIsLoading(false);
    }
  }, [data]);

  const headers = [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "gender",
      header: "Gender",
    },
    {
      key: "hivStatus",
      header: "HIV Status",
    },
  ];

  return (
    <>
      <DataTable rows={familyMembers} headers={headers}>
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
              {familyMembers.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={headers.length}>
                    No records of family members.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    {headers.map((header) => (
                      <TableCell key={row.id + header.key}>
                        {row.cells[header.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </>
  );
};

export default IndexClientContacts;
