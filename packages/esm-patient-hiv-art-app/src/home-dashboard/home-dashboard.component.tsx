import React from "react";
import { Grid, Column } from "@carbon/react";
import { Home } from "@carbon/react/icons";
import styles from "./home-dashboard.scss";
import { useTranslation } from "react-i18next";

const HomeDashboard = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.parent}>
      {/* ................Title......................... */}
      <div className={styles.titleContainer}>
        <Home color="green" size="24" className={styles.homeIcon} />
        <p className={styles.titleText}>{t("home", "Home")}</p>
        <p className={styles.dashboardText}>{t("dashboard", "Dashboard")}</p>
      </div>

      {/* ..................Body................. */}
      <div className={styles.body}></div>
    </div>
  );
};

export default HomeDashboard;
