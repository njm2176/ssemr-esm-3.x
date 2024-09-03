import React from "react";
import classnames from "classnames";
import { Button, TextInput, Loading } from "@carbon/react";
import styles from "./lists-dashboard.scss";
import { usePatientListing } from "../hooks/usePatientListing";
import DataTable from "react-data-table-component";
import SsemrListTabComponent from "../components/tab/ssemr-list-tab.component";
import Header from "../components/header/header.component";

const customDatatableStyles = {
  head: {
    style: {
      fontWeight: 700,
      fontSize: "14px",
    },
  },
};

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
    currentPaginationState,
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
              disabled={!currentPaginationState.done}
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
            <div>
              <div className={styles.noRecords}>
                <p className={styles.noRecordsText}>
                  Please wait as we fetch the clients. This may take up to a few
                  seconds.
                </p>
              </div>
              <Loading small className={styles.spinner} withOverlay={false} />
            </div>
          ) : (
            <DataTable
              customStyles={customDatatableStyles}
              paginationPerPage={15}
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
