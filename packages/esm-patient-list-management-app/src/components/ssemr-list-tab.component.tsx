import React from "react";
import styles from "./index.scss";

const SsemrListTabComponent = ({ name, handler, isActive }) => {
  return (
    <button
      className={isActive ? styles.activeTab : styles.tab}
      onClick={handler}
    >
      {name}
    </button>
  );
};

export default SsemrListTabComponent;
