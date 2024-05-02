import React, { useMemo } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./dashboardLink.css";

export interface DashboardLinkConfig {
  name: string;
  title: string;
}

export function DashboardExtension({
  dashboardLinkConfig,
}: {
  dashboardLinkConfig: DashboardLinkConfig;
}) {
  const { t } = useTranslation();
  const { name, title } = dashboardLinkConfig;
  const location = useLocation();
  const spaBasePath = `${window.spaBase}/home`;

  const navLink = useMemo(() => {
    const pathArray = location.pathname.split("/home");
    const lastElement = pathArray[pathArray.length - 1];
    return decodeURIComponent(lastElement);
  }, [location.pathname]);

  const reportsUrl =
    "https://ssemr.intellisoftkenya.com/openmrs/ssemrreports/reports.page";

  const handleClick = () => {
    const url = name === "reports" ? reportsUrl : `${spaBasePath}/${name}`;
    window.open(url, "_blank");
  };

  return (
    <h1
      className={`cds--side-nav__link ${
        navLink.match(name) && "active-left-nav-link"
      }`}
      style={{
        textAlign: "left",
        paddingLeft: "16px",
        lineHeight: "2.5",
        cursor: "pointer",
      }}
      onClick={handleClick}
      role="button"
      tabIndex={-1}
    >
      {t(name, title)}
    </h1>
  );
}

export const createDashboardLink =
  (dashboardLinkConfig: DashboardLinkConfig) => () =>
    (
      <BrowserRouter>
        <DashboardExtension dashboardLinkConfig={dashboardLinkConfig} />
      </BrowserRouter>
    );
