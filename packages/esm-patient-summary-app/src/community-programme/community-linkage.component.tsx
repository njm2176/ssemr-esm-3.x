import React from "react";
import styles from "./community-linkage.scss";
import { useTranslation } from "react-i18next";
import { formatDate, useLayoutType } from "@openmrs/esm-framework";
import { StructuredListSkeleton, Tile } from "@carbon/react";
import useObservationData from "../hooks/useObservationData";

export interface CommunityLinkageProps {
  patientUuid: string;
  code: string;
}
const CommunityLinkage: React.FC<CommunityLinkageProps> = ({
  patientUuid,
  code,
}) => {
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
          <div className={styles.content}>
            <p style={{ marginRight: "15px" }}>
              {t("nameOfCHW", "Name of the Community Health Worker (CHW)")}
            </p>
            <p>{extractObservationData(data, "Name of CHW")}</p>
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
export default CommunityLinkage;
