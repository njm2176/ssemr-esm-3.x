import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "../index.scss";
import { Loading } from "@carbon/react";
import ChartHeaderComponent from "../shared/chart-header.component";

interface D3BarChartProps {
  chartData?: Array<any>;
  listData?: Array<any>;
  title?: string;
  tooltipRenderFunction?: (item: any) => string;
  headerTableColumns?: Array<any>;
  xKey?: string;
  yKey?: string;
  loading?: boolean;
}

const D3BarChartComponent: React.FC<D3BarChartProps> = ({
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
   * SVG ref to reference parent DIV
   */
  const containerRef = useRef(null);
  /**
   * Ref for x-axis
   */
  const xAxisRef = useRef(null);
  /**
   * Bar config
   */
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [margins, setMargins] = useState({
    top: 20,
    right: 30,
    bottom: 200,
    left: 40,
  });

  const maximumBarWidth = 35;

  /**
   * Generate scales
   */
  const generateScales = () => {
    const xScale = d3
      .scaleBand()
      .domain(chartData.map((d) => d[xKey]))
      .range([margins.left, chartDimensions.width - margins.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d[yKey])])
      .nice()
      .range([chartDimensions.height - margins.bottom, margins.top]);

    setScales({ xScale, yScale });
  };

  useEffect(() => {
    if (chartData && chartDimensions.height > 0) generateScales();
  }, [chartData, chartDimensions, margins]);

  const { xScale, yScale } = scales;

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
        width: containerRef.current.getBoundingClientRect().width,
        height: containerRef.current.getBoundingClientRect().height,
      });
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (!xAxisRef.current) {
      return;
    }
    const xAxis = d3.select(xAxisRef.current).call(d3.axisBottom(xScale));
    const ticks = xAxis.selectAll(".tick text");
    const tickSpacing = xScale.bandwidth();
    let overlap = false;
    let maxLabelWidth = 0;

    ticks?.each(function (tick, index) {
      const thisLabel = d3.select(this);
      const nextLabel = d3.select(ticks.nodes()[index + 1]);
      // @ts-ignore
      const thisLabelWidth = thisLabel.node().getBBox().width;
      maxLabelWidth = Math.max(maxLabelWidth, thisLabelWidth);
      if (!nextLabel.empty()) {
        // @ts-ignore
        const nextLabelWidth = nextLabel.node().getBBox().width;
        if (thisLabelWidth / 2 + nextLabelWidth / 2 > tickSpacing)
          overlap = true;
      }
    });
    if (overlap) {
      ticks.attr("transform", "rotate(-30)").style("text-anchor", "end");
      setMargins((prev) => ({ ...prev, bottom: 200 }));
    } else {
      setMargins((prev) => ({ ...prev, bottom: 150 }));
    }
  }, [xScale]);

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
        {xScale && yScale && !loading && chartData?.length > 0 && (
          <>
            {chartData.map((d) => (
              <rect
                className={styles.bars}
                key={d[xKey]}
                x={
                  xScale(d[xKey]) +
                  (xScale.bandwidth() -
                    Math.min(xScale.bandwidth(), maximumBarWidth)) /
                    2
                }
                y={yScale(d[yKey])}
                width={Math.min(xScale.bandwidth(), maximumBarWidth)}
                height={yScale(0) - yScale(d[yKey])}
                onMouseOver={(event) => handleMouseOver(event, d)}
                onMouseOut={handleMouseOut}
              />
            ))}

            {/*...................X-AXIS.............................*/}
            <g
              transform={`translate(0, ${
                chartDimensions.height - margins.bottom
              })`}
              ref={xAxisRef}
            />

            {/*................Y-AXIS.......................*/}
            <g
              transform={`translate(${margins.left}, 0)`}
              ref={(node) => d3.select(node).call(d3.axisLeft(yScale))}
            />

            {/*  ..........HORIZONTAL LINES.................*/}
            {yScale.ticks().map((tick, index) => (
              <line
                key={index}
                x1={margins.left}
                x2={chartDimensions.width - margins.right}
                y1={yScale(tick)}
                y2={yScale(tick)}
                className={styles.horizontalLines}
              />
            ))}
          </>
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
export default D3BarChartComponent;
