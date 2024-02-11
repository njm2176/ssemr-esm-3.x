import React from "react";
import styles from "./index.scss";

const SSEMRTab = ({ name, handler, isActive }) => {
  return (
    <button onClick={handler} className={styles.tab}>
      {name}
    </button>
  );
};

export default SSEMRTab;
