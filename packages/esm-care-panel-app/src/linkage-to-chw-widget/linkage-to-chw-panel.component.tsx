import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StructuredListSkeleton, ContentSwitcher, Switch } from "@carbon/react";
import styles from "./linkage-to-chw-panel.scss";
import { CardHeader, EmptyState } from "@openmrs/esm-patient-common-lib";
import first from "lodash/first";
import sortBy from "lodash/sortBy";
import { ErrorState } from "@openmrs/esm-framework";
import LinkageToCHW from "../linkage-community/linkage-to-community-component";

interface PatientHistoryProps {
  patientUuid: string;
  formEntrySub: any;
  launchPatientWorkspace: Function;
}

const LinkageToCommunityHealthWorker: React.FC<PatientHistoryProps> = ({
  patientUuid,
  formEntrySub,
  launchPatientWorkspace,
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
        />
        <div style={{ width: "100%", minHeight: "5rem" }}>
          <LinkageToCHW patientUuid={""} programName={""} />
        </div>
      </div>
    </>
  );
};

export default LinkageToCommunityHealthWorker;
