import React from "react";

const Tooltip = ({ x, y, data }) => (
  <foreignObject
    x={x}
    y={y}
    width="100%"
    height={200}
    style={{ pointerEvents: "none" }}
  >
    <div
      style={{
        position: "absolute",
        backgroundColor: "white",
        border: "1px solid black",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      <p style={{ margin: 0 }}>
        total:
        <strong>{data.total}</strong>
      </p>
    </div>
  </foreignObject>
);

export default Tooltip;
