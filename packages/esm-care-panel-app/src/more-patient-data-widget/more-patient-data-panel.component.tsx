import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StructuredListSkeleton, ContentSwitcher, Switch } from "@carbon/react";
import styles from "./more-patient-data-panel.scss";
import { CardHeader, EmptyState } from "@openmrs/esm-patient-common-lib";
import first from "lodash/first";
import sortBy from "lodash/sortBy";
import { ErrorState } from "@openmrs/esm-framework";
import MorePatientData from "../more-client-data/more-client-data-component";

interface PatientHistoryProps {
  patientUuid: string;
  formEntrySub: any;
}

type SwitcherItem = {
  index: number;
  name?: string;
  text?: string;
};

const PatientData: React.FC<PatientHistoryProps> = ({
  patientUuid,
  formEntrySub,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.widgetCard}>
        <CardHeader title={t("", "")} children={""}></CardHeader>
        <div style={{ width: "100%", minHeight: "20rem" }}>
          <MorePatientData patientUuid={""} programName={""} />
        </div>
      </div>
    </>
  );
};

export default PatientData;
