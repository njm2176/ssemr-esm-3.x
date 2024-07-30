import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "../index.scss";
import { Loading } from "@carbon/react";
import ChartHeaderComponent from "../chart-header.component";

interface D3BarChartProps {
  chartData: Array<any>;
  listData: Array<any>;
  title: string;
  tooltipRenderFunction: (item: any) => string;
  headerTableColumns: Array<any>;
  xKey: string;
  yKey: string;
  loading: boolean;
}

const D3LineGraphComponent: React.FC<D3BarChartProps> = ({
  chartData,
  listData,
  title = "",
  tooltipRenderFunction,
  headerTableColumns,
  xKey,
  yKey,
  loading,
}) => {
  /**
   * State for x and y scales
   */
  const [scales, setScales] = useState({
    xScale: null,
    yScale: null,
    line: null,
  });
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
   * SVG ref to reference the parent SVG
   */
  const svgRef = useRef(null);
  /**
   * SVG red to reference parent DIV
   */
  const containerRef = useRef(null);
  /**
   * Bar config
   */
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });

  const margin = { top: 20, right: 80, bottom: 150, left: 20 };

  /**
   * Generate scales
   */
  const generateScales = () => {
    const xScale = d3
      .scalePoint()
      .domain(chartData.map((d) => d[xKey]))
      .range([margin.left, chartDimensions.width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d[yKey])])
      .nice()
      .range([chartDimensions.height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => xScale(d[xKey]))
      .y((d) => yScale(d[yKey]))
      .curve(d3.curveCatmullRom);

    setScales({ xScale, yScale, line });
  };
  useEffect(() => {
    if (chartData && chartDimensions.height > 0) generateScales();
  }, [chartData, chartDimensions]);

  const { xScale, yScale, line } = scales;

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

  const updateDimensions = () => {
    if (containerRef.current)
      setChartDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
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
      <svg
        ref={svgRef}
        width={chartDimensions.width}
        height={chartDimensions.height}
      >
        {xScale && yScale && !loading && (
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <path
              d={line(chartData)}
              fill="none"
              stroke="steelblue"
              strokeWidth="2"
            />
            {chartData.map((d, i) => (
              <circle
                // className={styles.points}
                key={i}
                cx={xScale(d[xKey])}
                cy={yScale(d[yKey])}
                r={5}
                fill="steelblue"
                onMouseOver={(event) => handleMouseOver(event, d)}
                onMouseOut={handleMouseOut}
              />
            ))}

            {/*...................X-AXIS.............................*/}
            <g
              transform={`translate(0, ${
                chartDimensions.height - margin.bottom
              })`}
              ref={(node) =>
                d3.select(node).call(d3.axisBottom(xScale).tickSize(0))
              }
            />

            {/*................Y-AXIS.......................*/}
            <g
              transform={`translate(${margin.left}, 0)`}
              ref={(node) => d3.select(node).call(d3.axisLeft(yScale))}
            />

            {/*  ..........HORIZONTAL LINES.................*/}
            {yScale.ticks().map((tick, index) => (
              <line
                key={index}
                x1={margin.left}
                x2={chartDimensions.width - margin.right}
                y1={yScale(tick)}
                y2={yScale(tick)}
                className={styles.horizontalLines}
              />
            ))}
          </g>
        )}
      </svg>
      {/*........TOOLTIP*/}
      {tooltip.visible && (
        <div
          className={styles.tooltip}
          style={{ left: tooltip.x + 10, top: tooltip.y - 6 }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};
export default D3LineGraphComponent;
