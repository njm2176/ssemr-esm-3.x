import React from "react";
import styles from "./community-linkage.scss";
import { useTranslation } from "react-i18next";
import useObservationData from "../hooks/useObservationData";
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

export interface CommunityLinkageProps {
  patientUuid: string;
  code: string;
}

const CommunityLinkage: React.FC<CommunityLinkageProps> = ({ patientUuid }) => {
  const { data, isLoading, error } = useObservationData(patientUuid);
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
    return (
      <Tile>
        <p className={styles.emptyState}>
          {t("noCHWRecord", "No Community Health Worker (CHW) record found.")}
        </p>
      </Tile>
    );
  }

  // Get CHW list and assign unique IDs to each
  const chwListRaw = data?.results[0]?.chw || [];
  const chwList = chwListRaw.map((item, index) => ({
    id: `chw-${index}`,
    ...item,
  }));

  const headers = [
    { key: "cadre", header: t("cadre", "Cadre") },
    { key: "name", header: t("name", "Name") },
    { key: "phone", header: t("phone", "Phone") },
    { key: "address", header: t("address", "Address") },
  ];

  return (
    <div className={styles.card}>
      {chwList.length > 0 ? (
        <DataTable rows={chwList} headers={headers} isSortable={false}>
          {({ rows, headers, getHeaderProps, getRowProps }) => (
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader key={header.key} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value || "---"}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>
      ) : (
        <Tile>
          <p className={styles.emptyState}>
            {t("noCHWRecord", "No Community Health Worker (CHW) record found.")}
          </p>
        </Tile>
      )}
    </div>
  );
};

export default CommunityLinkage;