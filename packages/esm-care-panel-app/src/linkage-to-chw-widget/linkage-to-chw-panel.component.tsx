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

type SwitcherItem = {
  index: number;
  name?: string;
  text?: string;
};

const LinkageToCommunityHealthWorker: React.FC<PatientHistoryProps> = ({
  patientUuid,
  formEntrySub,
  launchPatientWorkspace,
}) => {
  const { t } = useTranslation();
  const [switchItem, setSwitcherItem] = useState<SwitcherItem>({ index: 0 });

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
        <div style={{ width: "100%", minHeight: "20rem" }}>
          <LinkageToCHW patientUuid={""} programName={""} />
        </div>
      </div>
    </>
  );
};

export default LinkageToCommunityHealthWorker;
