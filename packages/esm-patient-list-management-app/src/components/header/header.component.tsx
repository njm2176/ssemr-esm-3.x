import React from "react";
import { useTranslation } from "react-i18next";

import Illustration from "./illo.component";
import styles from "./header.scss";

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.patientListHeader} data-testid="patient-list-header">
      <div className={styles.leftJustifiedItems}>
        <Illustration />
        <div className={styles.pageLabels}>
          <p>{t("patientLists", "Patient lists")}</p>
          <p className={styles.pageName}>{t("home", "Home")}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
