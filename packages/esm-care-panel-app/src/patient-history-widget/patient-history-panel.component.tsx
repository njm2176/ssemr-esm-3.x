import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./patient-history-panel.scss";
import { CardHeader } from "@openmrs/esm-patient-common-lib";
import LastArvRefillDate from "../patient-history/last-arv-refill-date.component";

interface CarePanelProps {
  patientUuid: string;
  formEntrySub: any;
  launchPatientWorkspace: Function;
}

const patientHistory: React.FC<CarePanelProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.widgetCard}>
        <CardHeader
          title={t("patientHistory", "Patient History")}
          children={""}
        ></CardHeader>
        <div style={{ width: "100%", minHeight: "20rem" }}>
          <LastArvRefillDate patientUuid={""} code={""} />
        </div>
      </div>
    </>
  );
};

export default patientHistory;
