import React, { useEffect, useState } from "react";
import styles from "./patient-history.component.scss";
import { useTranslation } from "react-i18next";
import { Tile, StructuredListSkeleton } from "@carbon/react";
import useObservationData from "../hooks/useObservationData";

export interface PatientHistoryProps {
  patientUuid: string;
  code: string;
}
const VLStatus: React.FC<PatientHistoryProps> = ({ patientUuid, code }) => {
  const { t } = useTranslation();
  const [userData, setData] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/openmrs/ws/rest/v1/obs?patient=${patientUuid}&_sort=-date&limit=1000`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching observation data:", error);
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [patientUuid]);

  const extractObservationData = (data, keyword) => {
    if (data && data.results) {
      const observation = data.results.find((entry) =>
        entry.display.startsWith(keyword)
      );
      return observation ? observation.display.split(": ")[1] : "---";
    } else {
      return "No observation Found";
    }
  };

  console.log("VL Data:", userData);

  if (loading) {
    return <StructuredListSkeleton role="progressbar" />;
  }

  if (error) {
    return (
      <span>
        {t("errorViralLoadSummary", "Error loading Viral Load summary")}
      </span>
    );
  }

  if (!userData || Object.keys(userData).length === 0) {
    return null;
  }

  const vlDate = extractObservationData(
    userData,
    "Date Viral Load Results Received"
  );
  const vlResult = extractObservationData(userData, "Viral Load");
  let vlStatus = "---";

  if (typeof vlResult === "number") {
    vlStatus = vlResult >= 1000 ? "Unsuppressed" : "Suppressed";
  }

  return (
    <>
      <Tile>
        <div className={styles.card}>
          <div className={styles.desktopHeading}>
            <h5 className={styles.title}>
              {t("viralLoadHistory", "Viral Load History")}
            </h5>
          </div>
          <div className={styles.card}>
            <div className={styles.container}>
              <div className={styles.content}>
                <p>{t("date", "Date")}</p>
                <p>
                  {extractObservationData(
                    userData,
                    "Date Viral Load Results Received"
                  )}
                </p>
              </div>
              <div className={styles.content}>
                <p>{t("lastVLResult", "Last VL Result")}</p>
                <p className={styles.value}>
                  {extractObservationData(userData, "CD4")}
                </p>
              </div>
              <div className={styles.content}>
                <p>{t("vlStatus", "VL Status")}</p>
                <p>
                  <span className={styles.value}>{vlStatus}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Tile>
    </>
  );
};
export default VLStatus;
