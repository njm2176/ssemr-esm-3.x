import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./more-info-panel.scss";
import ProgramSummary from "../program-summary/program-summary.component";
import { CardHeader } from "@openmrs/esm-patient-common-lib";
import ClientInfo from "../more-client-information/more-client-info.component";

interface MoreClientInfoPanelProps {
  patientUuid: string;
  formEntrySub: any;
}

const MoreClientInfoPanel: React.FC<MoreClientInfoPanelProps> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.widgetCard}>
        <div style={{ width: "100%", minHeight: "10rem" }}>
          <ClientInfo patientUuid={patientUuid} code={""} />
        </div>
      </div>
    </>
  );
};

export default MoreClientInfoPanel;
