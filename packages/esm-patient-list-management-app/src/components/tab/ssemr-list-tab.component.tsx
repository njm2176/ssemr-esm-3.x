import React from "react";
import styles from "./index.scss";

const SsemrListTabComponent = ({
  disabled,
  name,
  handler,
  isActive,
  activeClassName,
  inertClassName,
}) => {
  return (
    <button
      disabled={disabled}
      className={isActive ? styles[activeClassName] : styles[inertClassName]}
      onClick={handler}
    >
      {name}
    </button>
  );
};

export default SsemrListTabComponent;
