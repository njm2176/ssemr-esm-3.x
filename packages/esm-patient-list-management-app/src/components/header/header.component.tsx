import React from "react";
import { useTranslation } from "react-i18next";

import { navigate } from "@openmrs/esm-framework";
import Illustration from "./illo.component";
import styles from "./header.scss";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const newCohortUrl =
    window.getOpenmrsSpaBase() + "home/patient-lists?new_cohort=true";

  return (
    <div className={styles.patientListHeader}>
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
