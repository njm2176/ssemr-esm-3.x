import React from "react";
import styles from "./index.scss";

const SsemrListTabComponent = ({
  name,
  handler,
  isActive,
  activeClassName,
  inertClassName,
}) => {
  const handleClick = () => {
    if (!isActive){
      handler()
    }
  }

  return (
    <button
      className={isActive ? styles[activeClassName] : styles[inertClassName]}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default SsemrListTabComponent;
