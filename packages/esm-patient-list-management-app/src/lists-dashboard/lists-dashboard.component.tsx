import React from "react";
import classnames from "classnames";
import { SkeletonPlaceholder, Button, TextInput, Loading } from "@carbon/react";
import Header from "../header/header.component";
import styles from "./lists-dashboard.scss";
import { usePatientListing } from "../hooks/usePatientListing";
import DataTable from "react-data-table-component";
import SsemrListTabComponent from "../components/ssemr-list-tab.component";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className={styles.filterComponent}>
    <TextInput
      size="sm"
      className={styles.searchInput}
      type="text"
      value={filterText}
      onChange={onFilter}
      placeholder="Search...."
    />
    <Button size="sm" onClick={onClear} kind="danger">
      Clear
    </Button>
  </div>
);

const ListsDashboard: React.FC = () => {
  const {
    tabs,
    currentTab,
    tableHeaders,
    handleTabChange,
    filterText,
    setFilterText,
    resetPaginationToggle,
    setResetPaginationToggle,
    loading,
    filteredTableData,
  } = usePatientListing();

  const SubHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle((prev) => !prev);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(evt) => setFilterText(evt.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <main
      className={classnames("omrs-main-content", styles.dashboardContainer)}
    >
      <section className={styles.dashboard}>
        <Header />
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <SsemrListTabComponent
              name={tab.text}
              activeClassName={tab.activeClassName}
              inertClassName={tab.interClassName}
              handler={() => handleTabChange(index)}
              isActive={index === currentTab}
            />
          ))}
        </div>
        <div className={styles.listsTableContainer}>
          {loading ? (
            <Loading small className={styles.spinner} withOverlay={false} />
          ) : (
            <DataTable
              paginationResetDefaultPage={resetPaginationToggle}
              subHeader
              subHeaderComponent={SubHeaderComponentMemo}
              columns={tableHeaders}
              data={filteredTableData}
              pagination
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default ListsDashboard;
