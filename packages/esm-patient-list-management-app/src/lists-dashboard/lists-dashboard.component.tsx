import React from "react";
import classnames from "classnames";
import {
  Tab,
  Tabs,
  TabList,
  SkeletonPlaceholder,
  Button,
  TextInput,
} from "@carbon/react";
import Header from "../header/header.component";
import styles from "./lists-dashboard.scss";
import { usePatientListing } from "../hooks/usePatientListing";
import DataTable from "react-data-table-component";

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
        <Tabs
          selectedIndex={currentTab}
          onChange={({ selectedIndex }) => handleTabChange(selectedIndex)}
          tabContentClassName={styles.hiddenTabsContent}
          className={styles.tabs}
        >
          <TabList className={styles.tablist} aria-label="List tabs" contained>
            {tabs.map((tab) => (
              <Tab className={styles[tab.tabClass]} key={tab.id} tab={tab}>
                <p className={styles[tab.textClass]}>{tab.text}</p>
              </Tab>
            ))}
          </TabList>
        </Tabs>
        <div className={styles.listsTableContainer}>
          {loading ? (
            <SkeletonPlaceholder className={styles.skeleton} />
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
