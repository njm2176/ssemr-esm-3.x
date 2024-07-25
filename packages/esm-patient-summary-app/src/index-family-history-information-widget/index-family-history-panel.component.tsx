import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./more-info-panel.scss";
// import ClientInfo from "../family-history-information/more-client-info.component";
import IndexFamilyInfo from "../index-family-history-information/index-family-info.component";

interface MoreClientInfoPanelProps {
  patientUuid: string;
  formEntrySub: any;
}

const ClientFamilyInfoPanel: React.FC<MoreClientInfoPanelProps> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.widgetCard}>
        <div style={{ width: "100%", minHeight: "10rem" }}>
          <IndexFamilyInfo patientUuid={patientUuid} code={""} />
        </div>
      </div>
    </>
  );
};

export default ClientFamilyInfoPanel;
