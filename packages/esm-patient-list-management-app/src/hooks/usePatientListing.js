import { useTranslation } from "react-i18next";
import React from "react";
import { openmrsFetch } from "@openmrs/esm-framework";

export const usePatientListing = () => {
  const { t } = useTranslation();

  const [currentTab, setCurrentTab] = React.useState(0);
  const [tableHeaders, setTableHeaders] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [filteredTableData, setFilteredTableData] = React.useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const startDate = `1970-01-01`;
  const endDate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  const tabs = [
    {
      id: "allClients",
      text: t("allClients", "All Clients"),
    },
    {
      id: "activeClients",
      text: t("activeClients", "Active Clients"),
    },
    {
      id: "IIT",
      text: t("iit", "IIT Clients"),
    },
    {
      id: "TAD",
      text: t("transferOutAndDied", "Transferred Out And Died"),
    },
  ];

  const defaultTableHeaders = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Sex",
      selector: (row) => row.sex,
    },
    {
      name: "Date enrolled",
      selector: (row) => row.dateEnrolled,
    },
    {
      name: "Last refill date",
      selector: (row) => row.lastRefillDate,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
    },
    {
      name: "Landmark",
      selector: (row) => row.landmark,
    },
    {
      name: "Village",
      selector: (row) => row.village,
    },
  ];

  const handleTabChange = (selectedIndex) => {
    setCurrentTab(selectedIndex);

    switch (selectedIndex) {
      case 0:
        getAllClients();
        break;

      case 1:
        getActiveClients();
        break;

      case 2:
        getIIT();
        break;

      default:
        getAllClients();
    }
  };

  const getChartData = async ({ url, responseCallback, errorCallBack }) => {
    try {
      setLoading(true);
      const response = await openmrsFetch(url);
      responseCallback(response.data);
    } catch (error) {
      errorCallBack(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllClients = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/allClients?startDate=${startDate}&endDate=${endDate}`,
      responseCallback: (data) => {
        setTableData(data.results);
        setTableHeaders(defaultTableHeaders);
      },
      errorCallBack: (error) => console.error(error),
    });

  const getActiveClients = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/activeClients?startDate=${startDate}&endDate=${endDate}`,
      responseCallback: (data) => {
        setTableData(data.results);
        setTableHeaders(defaultTableHeaders);
      },
      errorCallBack: (error) => console.error(error),
    });

  const getIIT = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/interruptedInTreatment?startDate=${startDate}&endDate=${endDate}`,
      responseCallback: (data) => {
        setTableData(data.results);
        setTableHeaders(defaultTableHeaders);
      },
      errorCallBack: (error) => console.error(error),
    });

  React.useEffect(() => {
    getAllClients();
  }, []);

  React.useEffect(() => {
    const filteredItems = tableData.filter((row) =>
      row.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredTableData(filteredItems);
    setResetPaginationToggle((prev) => !prev);
  }, [filterText, tableData]);

  return {
    tabs,
    currentTab,
    setCurrentTab,
    tableHeaders,
    tableData,
    handleTabChange,
    filterText,
    setFilterText,
    resetPaginationToggle,
    setResetPaginationToggle,
    loading,
    filteredTableData,
  };
};
