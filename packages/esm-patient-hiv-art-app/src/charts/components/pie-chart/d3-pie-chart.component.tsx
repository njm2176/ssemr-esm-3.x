import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "../index.scss";
import { Loading } from "@carbon/react";
import ChartHeaderComponent from "../shared/chart-header.component";

interface props {
  chartData?: Array<any>;
  listData?: Array<any>;
  title?: string;
  tooltipRenderFunction?: (item: any) => string;
  headerTableColumns?: Array<any>;
  loading?: boolean;
}

const D3PieChartComponent: React.FC<props> = ({
  chartData,
  listData,
  title = "",
  tooltipRenderFunction,
  headerTableColumns,
  loading,
}) => {
  /**
   * Tooltip state
   */
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });
  /**
   * Modal state handler to toggle it
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  /**
   * Bar config
   */
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
    radius: 0,
  });
  const margin = { top: 100, right: 100, bottom: 100, left: 100 };

  /**
   * SVG red to reference parent DIV
   */
  const containerRef = useRef(null);

  const updateDimensions = () => {
    if (containerRef.current)
      setChartDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
        radius:
          Math.min(
            containerRef.current.offsetWidth,
            containerRef.current.offsetHeight
          ) /
            2 -
          Math.max(margin.top, margin.bottom),
      });
  };

  const pie = d3.pie().value((d) => d.value)(chartData);

  const arc = d3.arc().innerRadius(0).outerRadius(chartDimensions.radius);

  const color = d3
    .scaleOrdinal()
    .domain(chartData.map((d) => d.name))
    .range(d3.schemeCategory10);

  /**
   * Mouse over on bars handler to position and toggle the tooltip
   * @param event
   * @param d
   */
  const handleMouseOver = (event, d) => {
    const [x, y] = d3.pointer(event);
    setTooltip({
      visible: true,
      x,
      y,
      content: tooltipRenderFunction(d),
    });
  };

  /**
   * Mouse out handler to hide the tooltip
   */
  const handleMouseOut = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: "" });
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);
  return (
    <div ref={containerRef} className={styles.container}>
      {loading && <Loading className={styles.spinner} withOverlay={false} />}
      <div className={styles.headerContainer}>
        <p className={styles.title}>{title}</p>
        {!loading && (
          <ChartHeaderComponent
            isModalOpen={isModalOpen}
            rows={listData}
            headers={headerTableColumns}
            open={() => setIsModalOpen(true)}
            close={() => setIsModalOpen(false)}
            title={title}
          />
        )}
      </div>
      <svg width={chartDimensions.width} height={chartDimensions.height}>
        <g
          transform={`translate(${chartDimensions.width / 2}, ${
            chartDimensions.height / 2
          })`}
        >
          {pie.map((d, i) => (
            <path
              key={i}
              d={arc(d)}
              fill={color(d.data.name)}
              stroke="white"
              strokeWidth="2px"
              onMouseOver={(evt) => handleMouseOver(evt, d)}
              onMouseOut={handleMouseOut}
            />
          ))}
        </g>
      </svg>
      {/*........TOOLTIP*/}
      {tooltip.visible && (
        <div
          className={styles.tooltip}
          style={{
            left: tooltip.x + chartDimensions.radius,
            top: tooltip.y + chartDimensions.radius * 2,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default D3PieChartComponent;
