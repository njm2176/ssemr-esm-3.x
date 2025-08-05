import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import { processWaterfallData } from "../helpers/dataManipulation";
import { renderWaterfallTooltip } from "../helpers/tooltips";

export interface ChartConfigItem {
  chartData?: Array<any>;
  listData?: Array<any>;
  title?: string;
  tooltipRenderFunction?: (item: any) => string;
  headerTableColumns?: Array<any>;
  xKey?: string;
  yKey?: string;
  loading?: boolean;
  chartType: string;
  total?: number;
  state?: State;
}

interface State {
  loading: boolean;
  lineListComplete: boolean;
}

export const useCharts = () => {
  const {
    chartData: {
      newlyEnrolledClients,
      activeClients,
      adultART,
      childART,
      underCareOfCommunityProgram,
      underCareOfCommunityChart,
      allClients,
      dueForViralLoad,
      viralLoadSamples,
      viralLoadResults,
      viralLoadChartCoverage,
      viralLoadSuppression,
      waterfall,
    },
    defaultStatHeaders,
    txCURRHeaders,
  } = useContext(DashboardContext);

  const currentTimeFilter = "groupYear";

  const waterfallConfig: Array<ChartConfigItem> = [
    {
      loading: waterfall?.loading,
      state: waterfall,
      tooltipRenderFunction: ({ currentItem, previousItem }) =>
        renderWaterfallTooltip({
          currentValue: currentItem,
          previousValue: previousItem,
        }),
      chartData: processWaterfallData(waterfall?.processedChartData),
      listData: [],
      title: "Waterfall Chart",
      headerTableColumns: [],
      xKey: "group",
      chartType: "waterfall",
    },
  ];

  const genericChartsConfig: Array<ChartConfigItem> = [
    {
      loading: newlyEnrolledClients?.loading,
      state: newlyEnrolledClients,
      tooltipRenderFunction: (row) => `Clients: ${row.clients}`,
      chartData: newlyEnrolledClients?.processedChartData,
      listData: newlyEnrolledClients?.raw?.results,
      title: "Newly Enrolled Clients (TX_NEW)",
      headerTableColumns: defaultStatHeaders,
      xKey: currentTimeFilter,
      yKey: "clients",
      chartType: "bar",
    },
    {
      loading: activeClients?.loading,
      state: activeClients,
      tooltipRenderFunction: (row) => `Clients: ${row.clients}`,
      chartData: activeClients?.processedChartData,
      listData: activeClients?.raw?.results,
      title: "Clients currently receiving ART (TX_CURR)",
      headerTableColumns: txCURRHeaders,
      xKey: currentTimeFilter,
      yKey: "clients",
      chartType: "bar",
    },
    {
      loading: adultART?.loading,
      state: adultART,
      tooltipRenderFunction: (row) => `Clients: ${row.total}`,
      chartData: adultART?.processedChartData,
      listData: [],
      title: "Adult ART Regimen",
      headerTableColumns: [],
      xKey: "text",
      yKey: "total",
      chartType: "bar",
    },
    {
      loading: childART?.loading,
      state: childART,
      tooltipRenderFunction: (row) => `Clients: ${row.total}`,
      chartData: childART?.processedChartData,
      listData: [],
      title: "Child ART Regimen",
      headerTableColumns: [],
      xKey: "text",
      yKey: "total",
      chartType: "bar",
    },
    {
      loading: underCareOfCommunityProgram.loading,
      state: underCareOfCommunityChart,
      tooltipRenderFunction: (item) => `${item.data.name}: ${item.data.value}%`,
      chartData: [
        {
          name: "Not Linked to CHW",
          value: underCareOfCommunityChart?.raw?.notLinkedToCHW,
        },
        {
          name: "Linked to CHW",
          value: underCareOfCommunityChart?.raw?.linkedToCHW,
        },
      ],
      listData: underCareOfCommunityProgram?.raw?.results,
      title: "Under Care Of Community Programmes",
      total: underCareOfCommunityChart?.raw?.totalPatients,
      headerTableColumns: defaultStatHeaders,
      chartType: "pie",
    },
  ];

  const viralLoadChartsConfig: Array<ChartConfigItem> = [
    {
      loading: dueForViralLoad?.loading,
      state: dueForViralLoad,
      tooltipRenderFunction: (row) => `Clients: ${row.clients}`,
      chartData: dueForViralLoad?.processedChartData,
      listData: dueForViralLoad?.raw?.results,
      title: "Due for viral load",
      headerTableColumns: defaultStatHeaders,
      xKey: currentTimeFilter,
      yKey: "clients",
      chartType: "bar",
    },
    {
      loading: viralLoadSamples?.loading,
      state: viralLoadSamples,
      tooltipRenderFunction: (row) => `Clients: ${row.clients}`,
      chartData: viralLoadSamples?.processedChartData,
      listData: viralLoadSamples?.raw?.results,
      title: "Viral load samples collected",
      headerTableColumns: defaultStatHeaders,
      xKey: currentTimeFilter,
      yKey: "clients",
      chartType: "bar",
    },
    {
      loading: viralLoadResults?.loading,
      state: viralLoadResults,
      tooltipRenderFunction: (row) => `Clients: ${row.clients}`,
      chartData: viralLoadResults?.processedChartData,
      listData: viralLoadResults?.raw?.results,
      title: "Viral Load Results",
      headerTableColumns: defaultStatHeaders,
      xKey: currentTimeFilter,
      yKey: "clients",
      chartType: "bar",
    },
    {
      state: viralLoadChartCoverage,
      tooltipRenderFunction: (item) => `${item.data.name}: ${item.data.value}%`,
      chartData: [
        {
          name: "Not covered",
          value: viralLoadChartCoverage?.raw?.notCovered,
        },
        {
          name: "Covered",
          value: viralLoadChartCoverage?.raw?.covered,
        },
      ],
      listData: viralLoadSamples?.raw?.results,
      title: "Viral Load Coverage",
      total: viralLoadChartCoverage?.raw?.totalPatients,
      headerTableColumns: defaultStatHeaders,
      chartType: "pie",
    },
    {
      state: viralLoadSuppression,
      tooltipRenderFunction: (item) => `${item.data.name}: ${item.data.value}%`,
      chartData: [
        {
          name: "Unsuppressed",
          value: viralLoadSuppression?.raw?.unSuppressed,
        },
        {
          name: "Suppressed",
          value: viralLoadSuppression?.raw?.suppressed,
        },
      ],
      listData: viralLoadSamples?.raw?.results,
      title: "Viral Load Suppression",
      total: viralLoadSuppression?.raw?.totalPatients,
      headerTableColumns: defaultStatHeaders,
      chartType: "pie",
    },
    {
      chartType: "HVL",
    },
  ];

  return { waterfallConfig, genericChartsConfig, viralLoadChartsConfig };
};
