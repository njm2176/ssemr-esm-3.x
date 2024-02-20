import React from "react";
import styles from "./linkage-to-community-component.scss";
import { useTranslation } from "react-i18next";
import { formatDate, useLayoutType } from "@openmrs/esm-framework";
import { StructuredListSkeleton, Tile } from "@carbon/react";
import { RegimenType } from "../types";
import LinkageToCHWTable from "./linkage-to-community-table";

export interface PatientHistoryProps {
  patientUuid: string;
  programName: string;
}
const LinkageToCHW: React.FC<PatientHistoryProps> = ({
  patientUuid,
  programName,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.card}>
        <div className={styles.container}>
          <LinkageToCHWTable patientUuid={""} code={""} />
        </div>
      </div>
    </>
  );
};
export default LinkageToCHW;
