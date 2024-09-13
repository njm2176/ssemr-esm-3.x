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
  const handleClick = () => {
    if (!isActive){
      handler()
    }
  }

  return (
    <button
      disabled={disabled}
      className={isActive ? styles[activeClassName] : styles[inertClassName]}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default SsemrListTabComponent;
