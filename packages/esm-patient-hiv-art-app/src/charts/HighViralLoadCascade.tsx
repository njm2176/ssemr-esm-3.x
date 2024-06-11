import React, { useContext, useEffect, useRef, useState } from "react";
import "@carbon/charts-react/styles.css";
import { DashboardContext } from "../context/DashboardContext";
import { useCascade } from "../hooks/useCascade.js";
import styles from "./styles/index.scss";
import { Loading } from "@carbon/react";
import CascadeHeader from "../components/headers/cascade-header.component";
import Tooltip from "../components/tabs/cascade-tooltip.component";

const SVGChart = () => {
  const {
    chartData: { highViralLoadCascade },
  } = useContext(DashboardContext);

  const divRef = useRef(null);

  const [divWidth, setDivWidth] = useState(0);

  const [data, setData] = useState([]);

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    data: {},
  });

  const [isTableOpen, setIsTableOpen] = useState(false);

  const headers = [
    "text",
    "total",
    "percentage",
    "averageTurnaroundTimeMonths",
  ];

  const handleMouseOver = (evt, d) => {
    const svg = evt.target.ownerSVGElement;
    const point = svg.createSVGPoint();
    point.x = evt.clientX;
    point.y = evt.clientY;
    const cursorPoint = point.matrixTransform(svg.getScreenCTM().inverse());
    setTooltip({
      visible: true,
      x: cursorPoint.x - 10,
      y: cursorPoint.y - 40,
      data: d,
    });
  };

  const handleMouseOut = () => {
    setTooltip({ visible: false, x: 0, y: 0, data: {} });
  };

  const { generateScale, scale, clearScale } = useCascade();
  useEffect(() => {
    if (highViralLoadCascade?.raw?.length > 0) {
      generateScale({ dataset: highViralLoadCascade?.raw });
      setData(highViralLoadCascade.raw);
    }
    return () => clearScale();
  }, [highViralLoadCascade]);

  const maxValue = Math.max(...data.map((d) => d.total));
  const barWidth = 40;
  const barSpacing = (divWidth * 0.85) / data.length;
  const chartHeight = 500;
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
    <div className={styles.cascadeContainer}>
      <div ref={divRef} className={styles.SVGWrapper}>
        {data?.length >= 1 ? (
          <>
            <CascadeHeader
              data={data}
              headers={headers}
              isModalOpen={isTableOpen}
              setIsModalOpen={setIsTableOpen}
              rows={data}
            />
            <svg width={divWidth} height={chartHeight + 2 * axisPadding}>
              {/* Y-axis */}
              <line
                x1={axisPadding - 20}
                y1={0}
                x2={axisPadding - 20}
                y2={chartHeight}
                stroke="black"
              />

              {/* Y-axis intervals */}
              {scale.map((value, index) => (
                <g key={index}>
                  <line
                    x1={axisPadding}
                    y1={chartHeight - (value / maxValue) * chartHeight}
                    x2={2500}
                    y2={chartHeight - (value / maxValue) * chartHeight}
                    stroke="#C0C0C0"
                    strokeDasharray="5,5"
                  />
                  <line
                    x1={axisPadding - 25}
                    y1={chartHeight - (value / maxValue) * chartHeight}
                    x2={axisPadding - 25}
                    y2={chartHeight - (value / maxValue) * chartHeight}
                    stroke="black"
                  />
                  <text
                    x={axisPadding - 30}
                    y={chartHeight - (value / maxValue) * chartHeight + 5}
                    textAnchor="end"
                    fontSize="10"
                  >
                    {value}
                  </text>
                </g>
              ))}

              {/* Bars */}
              {data.map((d, index) => (
                <g key={index}>
                  <rect
                    key={d.text}
                    x={axisPadding + index * (barWidth + barSpacing)}
                    y={chartHeight - (d.total / maxValue) * chartHeight}
                    width={barWidth}
                    height={(d.total / maxValue) * chartHeight}
                    fill="#0072c3"
                    onMouseOver={(evt) => handleMouseOver(evt, d)}
                    onMouseOut={handleMouseOut}
                  />
                  {tooltip.visible && (
                    <Tooltip x={tooltip.x} y={tooltip.y} data={tooltip.data} />
                  )}
                </g>
              ))}

              {/* Name */}
              {data.map((d, index) => (
                <text
                  key={d.text}
                  x={
                    axisPadding + index * (barWidth + barSpacing) + barWidth / 2
                  }
                  y={chartHeight + 25}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="500"
                >
                  {d.text}
                </text>
              ))}

              {/* Percentage */}
              {data.map((d, index) => (
                <text
                  key={d.index}
                  x={
                    axisPadding + index * (barWidth + barSpacing) + barWidth / 2
                  }
                  y={chartHeight + 50}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="600"
                >
                  {Math.round(d.percentage * 100) / 100}%
                </text>
              ))}

              {/*Turn around */}
              {data.map((d, index) => (
                <text
                  key={index}
                  x={
                    axisPadding + index * (barWidth + barSpacing) + barWidth / 2
                  }
                  y={chartHeight + 75}
                  textAnchor="middle"
                  fontSize="10"
                >
                  {Math.round(d.averageTurnaroundTimeMonths * 100) / 100} Months
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
                        axisPadding +
                        index * (barWidth + barSpacing) +
                        barWidth * 3
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
          </>
        ) : (
          <Loading className={styles.spinner} withOverlay={false} />
        )}
        {data.length > 0 && (
          <div className={styles.legend}>
            <p className={styles.legendText}>Proportion of services %</p>
            <p className={styles.legendText}>Average turnaround time</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SVGChart;
