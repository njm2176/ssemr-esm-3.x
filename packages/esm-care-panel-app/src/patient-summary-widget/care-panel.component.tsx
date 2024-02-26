import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./care-panel.scss";
import ProgramSummary from "../program-summary/program-summary.component";
import { CardHeader } from "@openmrs/esm-patient-common-lib";
import LastArtVisitSummary from "../last-arv-visit-summary/last-arv-visit-summary.component";
import LastArvRefillDate from "../patient-history/last-arv-refill-date.component";

interface CarePanelProps {
  patientUuid: string;
  formEntrySub: any;
  launchPatientWorkspace: Function;
}

const CarePanel: React.FC<CarePanelProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.widgetCard}>
        <CardHeader
          title={t("patientSummary", "Patient Summary")}
          children={""}
        ></CardHeader>
        <div style={{ width: "100%", minHeight: "20rem" }}>
          <ProgramSummary patientUuid={patientUuid} code={""} />
          <LastArtVisitSummary patientUuid={patientUuid} code={""} />
          <LastArvRefillDate patientUuid={""} code={""} />
        </div>
      </div>
    </>
  );
};

export default CarePanel;
