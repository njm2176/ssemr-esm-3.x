import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./community-linkage-panel.scss";
import ProgramSummary from "../program-summary/program-summary.component";
import { CardHeader } from "@openmrs/esm-patient-common-lib";
import CommunityLinkage from "../community-programme/community-linkage.component";

interface CommunityLinkagePanelProps {
  patientUuid: string;
  formEntrySub: any;
}

const CommunityLinkagePanel: React.FC<CommunityLinkagePanelProps> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.widgetCard}>
        <CardHeader
          title={t(
            "linkageToCommunityProgramme",
            "Linkage To Community Programme"
          )}
          children={""}
        ></CardHeader>
        <div style={{ width: "100%", minHeight: "5rem" }}>
          <CommunityLinkage patientUuid={patientUuid} code={""} />
        </div>
      </div>
    </>
  );
};

export default CommunityLinkagePanel;
