import styles from "../../chart-styles/index.scss";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import React, { useEffect, useState } from "react";
import { generateChartCSV } from "../../../helpers/generateChartCSV";

interface ChartHeaderProps {
  isModalOpen: boolean;
  close: () => void;
  open: () => void;
  headers: Array<any>;
  rows: Array<any>;
  title: string;
}

const ChartHeaderComponent: React.FC<ChartHeaderProps> = ({
  isModalOpen,
  close,
  headers,
  rows,
  title,
  open,
}) => {
  const [formattedRows, setFormattedRows] = useState([]);

  /**
   * Format rows to extract landmark and village from address
   */
  useEffect(() => {
    if (rows) {
      const formattedResults = rows.map((client) => {
        const [landMark, village] = client.address
          .split(",")
          .map((part) => part.split(":")[1].trim());

        return {
          ...client,
          landMark,
          village,
        };
      });

      setFormattedRows(formattedResults);
    }
  }, [rows]);

  return (
    <div className={styles.cascadeHeader}>
      <svg
        onClick={open}
        style={{ width: 16, fill: "#161616", cursor: "pointer" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
      </svg>

      <Modal
        size="lg"
        onRequestSubmit={() =>
          generateChartCSV({ rows: formattedRows, fileName: title })
        }
        modalHeading={title}
        modalLabel="Do you want to download this as CSV?"
        primaryButtonText="Download CSV"
        secondaryButtonText="Decline"
        open={isModalOpen}
        onSecondarySubmit={close}
        onRequestClose={close}
      >
        {rows && (
          <Table size="lg" useZebraStyles={false}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader id={header} key={header}>
                    {header.name}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {headers.map((header) => (
                    <>
                      {header.cell ? (
                        header.cell(row)
                      ) : (
                        <TableCell>{row[header.selector]}</TableCell>
                      )}
                    </>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Modal>
    </div>
  );
};

export default ChartHeaderComponent;
