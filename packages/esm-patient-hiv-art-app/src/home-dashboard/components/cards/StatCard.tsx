import React from "react";
import styles from "./index.scss";
import { Loading } from "@carbon/react";

const StatCard = ({ item }) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{item.title}</div>
      {!item.stat ? (
        <div className={styles.spinner}>
          <Loading withOverlay={false} small={true} />
        </div>
      ) : (
        <>
          <p className={styles.stat}>{item.stat}</p>
          {item.icon}
        </>
      )}
    </div>
  );
};

export default StatCard;
