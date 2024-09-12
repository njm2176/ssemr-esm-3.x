import React, { useContext } from "react";
import styles from "./index.scss";
import { DashboardContext } from "../../context/DashboardContext";

const SSEMRTab = ({ name, handler, isActive, index }) => {
  const { setCurrentTopFilterIndex } = useContext(DashboardContext);
  const handleClick = () => {
    setCurrentTopFilterIndex(index);
  };

  return (
    <button
      onClick={handleClick}
      className={isActive ? styles.activeTab : styles.tab}
    >
      {name}
    </button>
  );
};

export default SSEMRTab;
