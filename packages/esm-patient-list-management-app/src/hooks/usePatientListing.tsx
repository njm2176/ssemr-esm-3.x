import { useTranslation } from "react-i18next";
import React, { useMemo, useCallback, useState, useEffect } from "react";
import Link from "@carbon/react/lib/components/UIShell/Link";

// This hook now MANAGES UI state and PERFORMS filtering/sorting on data it receives.
export const usePatientListing = (sourceData = [], currentTab = 0) => {
  const { t } = useTranslation();
  
  const [filterText, setFilterText] = useState("");
  const [tableHeaders, setTableHeaders] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);

  const tabs = useMemo(() => [
    { id: "allClients", text: t("allClients", "All Clients"), activeClassName: "darkActive", interClassName: "darkInert" },
    { id: "activeClients", text: t("activeClients", "Active Clients"), activeClassName: "greenActive", interClassName: "greenInert" },
    { id: "interruptedInTreatment", text: t("iit", "IIT Clients"), activeClassName: "amberActive", interClassName: "amberInert" },
    { id: "transferredOut", text: t("transferOut", "Transferred Out Clients"), activeClassName: "blueActive", interClassName: "blueInert" },
    { id: "deceased", text: t("died", "Died"), activeClassName: "redActive", interClassName: "redInert" },
  ], [t]);

  const defaultTableHeaders = useMemo(() => {
    const baseHeaders = [
        { name: "SN", selector: (row, index) => row.serialNumber },
        { name: "Name", cell: (row) => <Link href={`${window.getOpenmrsSpaBase()}patient/${row.uuid}/chart/Patient%20Summary`}>{row.name}</Link> },
        { name: "Age", selector: (row) => row.age },
        { name: "Sex", selector: (row) => row.sex },
        { name: "UAN", selector: (row) => row?.identifiers?.find((item) => item?.identifierType?.toLowerCase()?.includes("art"))?.identifier },
        { name: "ART Regimen", selector: (row) => row?.ARTRegimen },
        { name: "Date of initiation", selector: (row) => row.initiationDate },
        { name: "Last Refill Date", selector: (row) => row.lastRefillDate },
        { name: "Next Appointment Date", selector: (row) => row.appointmentDate },
    ];
    const currentTabId = tabs[currentTab]?.id;
    if (currentTabId === "interruptedInTreatment") return [...baseHeaders, { name: "Date Became IIT", selector: (row) => row.dateClientBecameIIT }];
    if (currentTabId === "deceased") return [...baseHeaders, { name: "Date Died", selector: (row) => row.datePatientDied }];
    if (currentTabId === "transferredOut") return [...baseHeaders, { name: "Date Transferred Out", selector: (row) => row.datePatientTransferredOut }];
    return baseHeaders;
  }, [currentTab, tabs]);

  useEffect(() => {
    setTableHeaders(defaultTableHeaders);
  }, [defaultTableHeaders]);

  const parseDate = useCallback((dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
    }, []);
  
  useEffect(() => {
    const filteredItems = sourceData
      .filter(row =>
        row?.name?.toLowerCase()?.includes(filterText.toLowerCase()) ||
        row?.identifiers?.find(item => item?.identifierType?.toLowerCase()?.includes("art"))?.identifier?.toLowerCase()?.includes(filterText.toLowerCase())
      )
      .map(row => ({ ...row }))
      .sort((a, b) => {
        const dateA = parseDate(a.initiationDate);
        const dateB = parseDate(b.initiationDate); 
        if (!dateA || !dateB) return 0;
        return dateB.getTime() - dateA.getTime();
        });
      
    filteredItems.forEach((row, index) => {
      row.serialNumber = index + 1;
    });
    setFilteredTableData(filteredItems);
  }, [filterText, sourceData, parseDate]);
  
  return {
    tabs,
    tableHeaders,
    tableData: filteredTableData,
    filterText,
    setFilterText,
  };
};
