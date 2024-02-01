import React from "react";
import styles from "./index.scss";

const ChartCard = ({ children }) => {
  return <div className={styles.chartCard}>{children}</div>;
};

export default ChartCard;
