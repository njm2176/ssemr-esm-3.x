import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import {
  TableRow
} from '@carbon/react';
import styles from './forms-table.scss';
import dayjs from 'dayjs';
import { Form, getPatientUuidFromStore } from '@openmrs/esm-patient-common-lib';
import { useVisitTime } from '../hooks/use-forms';

interface TableRow {
  id: string;
  lastCompleted: string;
  formName: string;
  formUuid: string;
  encounterUuid: string;
  form: Form;
}

interface FormsTableProps {
  tableHeaders: Array<{
    header: string;
    key: string;
  }>;
  tableRows: Array<TableRow>;
  isTablet: boolean;
  handleSearch: (search: string) => void;
  handleFormOpen: (form: Form, encounterUuid: string) => void;
  latestVisitDate: string;
}

const FormsTable = ({ tableHeaders, tableRows, handleSearch, handleFormOpen }: FormsTableProps) => {
  const { t } = useTranslation();

  const patientUuid = getPatientUuidFromStore();
  const [latestVisit, setLatestVisit] = useState(null);

  useEffect(() => {
    const fetchLatestVisit = async () => {
      const visit = await useVisitTime(patientUuid);
      setLatestVisit(visit);
    };
    fetchLatestVisit();
  }, [ patientUuid ]);

  const timeRegex = /(Today|Yesterday|[0-9]{2}-[A-Za-z]{3}-[0-9]{4})?,? \d{1,2}:\d{2} [APap][Mm]/;

  const isGreenBackground = (row: TableRow, latestVisit: string | null): boolean => {
    if (!latestVisit || !row.lastCompleted) return false;
  
    let normalizedLastCompleted: string | null = null;
  
    if (row.lastCompleted.includes('Today')) {
      normalizedLastCompleted = dayjs().format('YYYY-MM-DDTHH:mm:ss');
    } else if (row.lastCompleted.includes('Yesterday')) {
      normalizedLastCompleted = dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
    } else if (dayjs(row.lastCompleted, 'DD-MMM-YYYY, hh:mm A', true).isValid()) {
      normalizedLastCompleted = dayjs(row.lastCompleted, 'DD-MMM-YYYY, hh:mm A').format('YYYY-MM-DDTHH:mm:ss');
    }
  
    return normalizedLastCompleted && dayjs(normalizedLastCompleted).isAfter(dayjs(latestVisit));
  };
  
  const columns: TableColumn<TableRow>[] = [
    {
      name: t('formName', 'Form Name (A-Z)'),
      selector: (row) => row.formName,
      cell: (row) => (
        <a
          className={styles.formName}
          onClick={() => handleFormOpen(row.form, '')}
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: isGreenBackground(row, latestVisit) ? 'white' : '#007BFF',
          }}
        >
          {row.formName}
        </a>
      ),
    },
    {
      name: t('lastCompleted', 'Last Completed'),
      selector: (row) => row.lastCompleted || t('never', 'Never'),
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row: TableRow) => {
        if (!latestVisit) return false; 
  
        let normalizedLastCompleted: string | null = null;
  
        const lastCompleted = row.lastCompleted || '';
  
        if (lastCompleted.includes('Today')) {
          normalizedLastCompleted = dayjs().format('YYYY-MM-DDTHH:mm:ss');
        } else if (lastCompleted.includes('Yesterday')) {
          normalizedLastCompleted = dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
        } else if (dayjs(lastCompleted, 'DD-MMM-YYYY, hh:mm A', true).isValid()) {
          normalizedLastCompleted = dayjs(lastCompleted, 'DD-MMM-YYYY, hh:mm A').format('YYYY-MM-DDTHH:mm:ss');
        } else {
          normalizedLastCompleted = null; 
        }
  
        return normalizedLastCompleted && dayjs(normalizedLastCompleted).isAfter(dayjs(latestVisit));
      },
      style: {
        backgroundColor: '#008080', 
        color: 'white',
      },
    },
    {
      when: (row: TableRow) => {
        if (!latestVisit) return true;
  
        let normalizedLastCompleted: string | null = null;
  
        const lastCompleted = row.lastCompleted || '';
  
        if (lastCompleted.includes('Today')) {
          normalizedLastCompleted = dayjs().format('YYYY-MM-DDTHH:mm:ss');
        } else if (lastCompleted.includes('Yesterday')) {
          normalizedLastCompleted = dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
        } else if (dayjs(lastCompleted, 'DD-MMM-YYYY, hh:mm A', true).isValid()) {
          normalizedLastCompleted = dayjs(lastCompleted, 'DD-MMM-YYYY, hh:mm A').format('YYYY-MM-DDTHH:mm:ss');
        } else {
          normalizedLastCompleted = null; 
        }
  
        return (
          !normalizedLastCompleted ||
          dayjs(normalizedLastCompleted).isBefore(dayjs(latestVisit)) ||
          row.lastCompleted === t('never', 'Never')
        );
      },
      style: {
        backgroundColor: 'white',
        color: 'black',
      },
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#e0e0e0', 
        color: '#525252', 
        fontWeight: 'bold', 
        fontSize: '14px', 
        padding: '4px 8px', 
        lineHeight: '1',
        height: '10px',
      },
    },
    headCells: {
      style: {
        padding: '4px 8px', 
      },
    },
    rows: {
      style: {
        minHeight: '30px',
        padding: '4px 8px',
        lineHeight: '1.2',
      },
    },
    cells: {
      style: {
        padding: '4px 8px',
      },
    },
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.toolbarWrapper}>
        <span className={styles.searchIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 24 24"
            fill="#757575"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </span>
        
        <input
          type="text"
          className={styles.search}
          placeholder={t('searchThisList', 'Search this list')}
          onChange={(event) => handleSearch(event.target.value)}
        />
      </div>

      {latestVisit && (
        <DataTable
          columns={columns}
          data={tableRows}
          conditionalRowStyles={conditionalRowStyles}
          customStyles={customStyles}
          noHeader
          className={styles.dataTable}
        />
      )}
    </div>
  );
};

export default FormsTable;
