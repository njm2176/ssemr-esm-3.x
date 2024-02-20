import React, { useEffect, useState } from "react";
import styles from "./index.scss";
import {
  Loading,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";

const StatCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [csvData, setCsvData] = useState(null);

  const headers = ["Name", "Sex", "Date enrolled", "Clinical status"];

  const generateCSV = () => {
    const data = [["Name", "Sex", "Date enrolled", "Clinical status"]];
    rows.forEach((row) => {
      const values = Object.values(row);
      // @ts-ignore
      data.push(values);
    });

    let csv = "";
    data.forEach((row) => {
      csv += row.join(",") + "\n";
    });

    setCsvData(csv);
  };

  const handleDownload = () => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${item.title}.csv`;
    link.click();
  };

  useEffect(() => {
    if (item?.results) {
      const formattedResults = item.results.map((client) => ({
        name: client.name,
        sex: client.sex,
        dateEnrolled: client.dateEnrolled,
        clinicalStatus: item.title,
      }));

      setRows(formattedResults);
    }
  }, [item]);

  useEffect(() => {
    generateCSV();
  }, [rows]);

  return (
    <div className={styles.card}>
      <svg
        className={styles.download}
        onClick={() => setIsModalOpen((prev) => !prev)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
      </svg>
      <Modal
        onRequestSubmit={handleDownload}
        modalHeading={item.title}
        modalLabel="Do you want to download this as CSV?"
        primaryButtonText="Download CSV"
        secondaryButtonText="Decline"
        open={isModalOpen}
        onSecondarySubmit={() => setIsModalOpen(false)}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <Table size="md" useZebraStyles={false}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader id={header} key={header}>
                  {header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {Object.keys(row).map((key) => (
                  <TableCell key={key}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Modal>
      <div className={styles.title}>{item.title}</div>
      {!item.stat ? (
        <div className={styles.spinner}>
          <Loading withOverlay={false} small={true} />
        </div>
      ) : (
        <p className={styles.stat}>{item.stat}</p>
      )}
    </div>
  );
};

export default StatCard;
