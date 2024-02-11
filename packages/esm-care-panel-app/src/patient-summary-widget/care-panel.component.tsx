import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StructuredListSkeleton, ContentSwitcher, Switch } from "@carbon/react";
import styles from "./care-panel.scss";
import ProgramSummary from "../program-summary/program-summary.component";
import { CardHeader, EmptyState } from "@openmrs/esm-patient-common-lib";
import LastArtVisitSummary from "../last-arv-visit-summary/last-arv-visit-summary.component";
import first from "lodash/first";
import sortBy from "lodash/sortBy";
import { ErrorState } from "@openmrs/esm-framework";

interface CarePanelProps {
  patientUuid: string;
  formEntrySub: any;
  launchPatientWorkspace: Function;
}

type SwitcherItem = {
  index: number;
  name?: string;
  text?: string;
};

const CarePanel: React.FC<CarePanelProps> = ({
  patientUuid,
  formEntrySub,
  launchPatientWorkspace,
}) => {
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
        </div>
      </div>
    </>
  );
};

export default CarePanel;
