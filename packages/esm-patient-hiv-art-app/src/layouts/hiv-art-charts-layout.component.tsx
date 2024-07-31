import styles from "./index.scss";
import { useARTCharts } from "../hooks/useARTCharts";
import D3BarChartComponent from "../charts/components/bar-graph/d3-bar-chart.component";
import React from "react";
import D3LineGraphComponent from "../charts/components/line-graph/d3-line-graph.component";
import D3PieChartComponent from "../charts/components/pie-chart/d3-pie-chart.component";
import D3WaterfallComponent from "../charts/components/waterfall/d3-waterfall.component";
import HighViralLoadCascade from "../charts/components/custom/HighViralLoadCascade";

const HivArtChartsLayoutComponent = () => {
  const { chartConfig } = useARTCharts();
  return (
    <div className={styles.parent}>
      {chartConfig.map((config) => (
        <div className={styles.chart}>
          {config.chartType === "bar" ? (
            <D3BarChartComponent {...config} />
          ) : config.chartType === "line" ? (
            <D3LineGraphComponent {...config} />
          ) : config.chartType === "pie" ? (
            <D3PieChartComponent {...config} />
          ) : config.chartType === "waterfall" ? (
            <D3WaterfallComponent {...config} />
          ) : (
            <HighViralLoadCascade />
          )}
        </div>
      ))}
    </div>
  );
};

export default HivArtChartsLayoutComponent;
