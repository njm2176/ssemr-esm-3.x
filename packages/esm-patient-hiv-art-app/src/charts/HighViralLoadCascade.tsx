import React, { useContext, useEffect, useRef, useState } from "react";
import "@carbon/charts-react/styles.css";
import { DashboardContext } from "../context/DashboardContext";
import { useCascade } from "../hooks/useCascade.js";
import styles from "./styles/index.scss";
import { Loading } from "@carbon/react";

const SVGChart = () => {
  const {
    chartData: { highViralLoadCascade },
  } = useContext(DashboardContext);

  const divRef = useRef(null);
  const [divWidth, setDivWidth] = useState(0);

  const [data, setData] = useState([]);

  const { generateScale, scale } = useCascade();
  useEffect(() => {
    if (highViralLoadCascade?.raw?.length > 0) {
      generateScale({ dataset: highViralLoadCascade?.raw });
      setData(highViralLoadCascade.raw);
    }
  }, [highViralLoadCascade]);

  const maxValue = Math.max(...data.map((d) => d.total));
  const barWidth = 40;
  const barSpacing = (divWidth * 0.85) / data.length;
  const chartHeight = 380;
  const axisPadding = 40;

  const updateWidth = () => {
    if (divRef.current) setDivWidth(divRef.current.clientWidth);
  };

  useEffect(() => {
    // Measure the div's width and update the state
    updateWidth();
    // Add event listener for window resize
    window.addEventListener("resize", updateWidth);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div ref={divRef} className={styles.cascadeContainer}>
      {data?.length >= 1 ? (
        <svg width={divWidth} height={chartHeight + 2 * axisPadding}>
          {/* Y-axis */}
          <line
            x1={axisPadding}
            y1={axisPadding}
            x2={axisPadding}
            y2={chartHeight + axisPadding}
            stroke="black"
          />

          {/* Y-axis intervals */}
          {scale.map((value, index) => (
            <g key={index}>
              <line
                x1={axisPadding - 5}
                y1={
                  chartHeight + axisPadding - (value / maxValue) * chartHeight
                }
                x2={axisPadding}
                y2={
                  chartHeight + axisPadding - (value / maxValue) * chartHeight
                }
                stroke="black"
              />
              <text
                x={axisPadding - 10}
                y={
                  chartHeight +
                  axisPadding -
                  (value / maxValue) * chartHeight +
                  5
                }
                textAnchor="end"
                fontSize="10"
              >
                {value}
              </text>
            </g>
          ))}

          {/* Bars */}
          {data.map((d, index) => (
            <rect
              key={d.text}
              x={axisPadding + index * (barWidth + barSpacing)}
              y={chartHeight + axisPadding - (d.total / maxValue) * chartHeight}
              width={barWidth}
              height={(d.total / maxValue) * chartHeight}
              fill="#8884d8"
            />
          ))}

          {/* Name */}
          {data.map((d, index) => (
            <text
              key={d.text}
              x={axisPadding + index * (barWidth + barSpacing) + barWidth / 2}
              y={chartHeight + axisPadding + 10}
              textAnchor="middle"
              fontSize="10"
            >
              {d.text}
            </text>
          ))}

          {/* Percentage */}
          {data.map((d, index) => (
            <text
              key={d.percentage}
              x={axisPadding + index * (barWidth + barSpacing) + barWidth / 2}
              y={chartHeight + axisPadding + 25}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
            >
              {Math.round(d.percentage)}%
            </text>
          ))}

          {/*Turn around */}
          {data.map((d, index) => (
            <text
              key={d.averageTurnaroundTimeMonths}
              x={axisPadding + index * (barWidth + barSpacing) + barWidth / 2}
              y={chartHeight + axisPadding + 35}
              textAnchor="middle"
              fontSize="10"
            >
              {d.averageTurnaroundTimeMonths} Months
            </text>
          ))}

          {/* Arrow */}
          {data.map(
            (d, index) =>
              index !== data.length - 1 && (
                <svg
                  width={12}
                  key={index}
                  x={
                    axisPadding + index * (barWidth + barSpacing) + barWidth * 3
                  }
                  y={chartHeight / 2}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              )
          )}
        </svg>
      ) : (
        <Loading className={styles.spinner} withOverlay={false} />
      )}
    </div>
  );
};

export default SVGChart;
