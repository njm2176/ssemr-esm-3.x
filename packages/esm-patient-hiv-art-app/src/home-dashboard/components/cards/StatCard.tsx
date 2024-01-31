import React from "react";
import styles from "./index.scss";

const StatCard = ({ item }) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{item.title}</div>
      <p className={styles.stat}>{item.stat}</p>
      {item.icon}
    </div>
  );
};

export default StatCard;
