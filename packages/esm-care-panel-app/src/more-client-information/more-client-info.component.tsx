import React from "react";
import styles from "./more-info.scss";
import { useTranslation } from "react-i18next";
import { formatDate, useLayoutType } from "@openmrs/esm-framework";
import { StructuredListSkeleton, Tile } from "@carbon/react";
import useObservationData from "../hooks/useObservationData";
import FamilyHistory from "./family-members.component";

export interface ClientInfoProps {
  patientUuid: string;
  code: string;
}
const ClientInfo: React.FC<ClientInfoProps> = ({ patientUuid, code }) => {
  const { data, isLoading, error, extractObservationData } = useObservationData(
    patientUuid,
    code
  );
  const { t } = useTranslation();

  const isTablet = useLayoutType() == "tablet";
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
    return null;
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.container}>
          <FamilyHistory patientUuid={""} code={""} />
        </div>
      </div>
    </>
  );
};
export default ClientInfo;
