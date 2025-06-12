import React, { useCallback, useState } from "react";
import classnames from "classnames";
import { Button, TextInput, Loading, ProgressBar } from "@carbon/react";
import styles from "./lists-dashboard.scss";
import { usePatientListing } from "../hooks/usePatientListing";
import { useAutomaticPaginatedFetch } from "../hooks/useAutomaticPaginatedFetch";

import DataTable from "react-data-table-component";
import SsemrListTabComponent from "../components/tab/ssemr-list-tab.component";
import Header from "../components/header/header.component";


const customDatatableStyles = {
  head: { style: { fontWeight: 700, fontSize: "14px" } },
  table: { style: { paddingBottom: "2rem" } }
};

const FilterComponent = ({ filterText, onFilter, onClear, isFetchingMore }) => (
  <div className={styles.filterComponent}>
    {isFetchingMore && <Loading small withOverlay={false} className={styles.backgroundSpinner} />}
    <TextInput
      size="sm"
      className={styles.searchInput}
      type="text"
      value={filterText}
      onChange={onFilter}
      placeholder="Search by Name or UAN..."
    />
    <Button size="sm" onClick={onClear} kind="danger">
      Clear
    </Button>
  </div>
);


const ListsDashboard: React.FC = () => {
  const { data: allClientsData, isLoading: isLoadingAll, isFetchingMore: isFetchingMoreAll } = useAutomaticPaginatedFetch("allClients");
  const { data: activeClientsData, isLoading: isLoadingActive, isFetchingMore: isFetchingMoreActive } = useAutomaticPaginatedFetch("activeClients");
  const { data: iitData, isLoading: isLoadingIIT, isFetchingMore: isFetchingMoreIIT } = useAutomaticPaginatedFetch("interruptedInTreatment");
  const { data: transferredData, isLoading: isLoadingTAD, isFetchingMore: isFetchingMoreTAD } = useAutomaticPaginatedFetch("transferredOut");
  const { data: deceasedData, isLoading: isLoadingDied, isFetchingMore: isFetchingMoreDied } = useAutomaticPaginatedFetch("deceased");
  
  const [currentTab, setCurrentTab] = useState(0);

  const { activeData, activeLoading, activeFetchingMore } = React.useMemo(() => {
    switch (currentTab) {
      case 0: return { activeData: allClientsData, activeLoading: isLoadingAll, activeFetchingMore: isFetchingMoreAll };
      case 1: return { activeData: activeClientsData, activeLoading: isLoadingActive, activeFetchingMore: isFetchingMoreActive };
      case 2: return { activeData: iitData, activeLoading: isLoadingIIT, activeFetchingMore: isFetchingMoreIIT };
      case 3: return { activeData: transferredData, activeLoading: isLoadingTAD, activeFetchingMore: isFetchingMoreTAD };
      case 4: return { activeData: deceasedData, activeLoading: isLoadingDied, activeFetchingMore: isFetchingMoreDied };
      default: return { activeData: [], activeLoading: false, activeFetchingMore: false };
    }
  }, [
    currentTab, 
    allClientsData, activeClientsData, iitData, transferredData, deceasedData,
    isLoadingAll, isLoadingActive, isLoadingIIT, isLoadingTAD, isLoadingDied,
    isFetchingMoreAll, isFetchingMoreActive, isFetchingMoreIIT, isFetchingMoreTAD, isFetchingMoreDied
  ]);

  const {
    tabs,
    tableHeaders,
    filterText,
    setFilterText,
    tableData: finalTableData,
  } = usePatientListing(activeData, currentTab);

  const handleTabChange = useCallback((selectedIndex) => {
    setCurrentTab(selectedIndex);
    setFilterText("");
  }, [setFilterText]);


  const SubHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => filterText && setFilterText("");
    return <FilterComponent 
      onFilter={(evt) => setFilterText(evt.target.value)} 
      onClear={handleClear} 
      filterText={filterText}
      isFetchingMore={activeFetchingMore}
    />;
  }, [filterText, setFilterText, activeFetchingMore]);

  return (
    <main className={classnames("omrs-main-content", styles.dashboardContainer)}>
      <section className={styles.dashboard}>
        <Header />
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <SsemrListTabComponent key={tab.id} name={tab.text} activeClassName={tab.activeClassName} inertClassName={tab.interClassName} 
              handler={() => handleTabChange(index)} 
              isActive={index === currentTab} 
            />
          ))}
        </div>
        
        {activeLoading && <ProgressBar />}
        
        <div className={styles.listsTableContainer}>
          <DataTable
            customStyles={customDatatableStyles}
            paginationPerPage={15}
            subHeader
            subHeaderComponent={SubHeaderComponentMemo}
            columns={tableHeaders}
            data={finalTableData}
            pagination
            progressPending={activeLoading}
            progressComponent={<div className={styles.loadingComponent}><p>Loading Client List...</p><Loading withOverlay={false} /></div>}
            noDataComponent={<div className={styles.noRecords}><p className={styles.noRecordsText}>No records found</p></div>}
          />
        </div>
      </section>
    </main>
  );
};

export default ListsDashboard;