import React, { useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Button, StructuredListSkeleton } from "@carbon/react";
import {
  formatDate,
  useLayoutType,
  useSession,
  age,
  parseDate,
  useConfig,
  usePatient,
} from "@openmrs/esm-framework";
import { Printer } from "@carbon/react/icons";
import { useReactToPrint } from "react-to-print";
import PrintComponent from "../print-layout/print.component";
import styles from "./patient-summary.scss";
import {
  CardHeader,
  EmptyState,
  ErrorState,
  useVisitOrOfflineVisit,
  useVitalsConceptMetadata,
  withUnit,
} from "@openmrs/esm-patient-common-lib";
import usePatientData from "../hooks/usePatientData";
import useObservationData from "../hooks/useObservationData";

interface PatientSummaryProps {
  patientUuid: string;
  code: string;
}

const PatientSummary: React.FC<PatientSummaryProps> = ({
  patientUuid,
  code,
}) => {
  const currentUserSession = useSession();
  const componentRef = useRef(null);
  const [printMode, setPrintMode] = useState(false);

  const { t } = useTranslation();
  const isTablet = useLayoutType() == "tablet";
  const { patientData, Loading, isError } = usePatientData(patientUuid);
  const { data, isLoading, error } = useObservationData(
    patientUuid,
  );

  const printRef = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => setPrintMode(true),
    onAfterPrint: () => setPrintMode(false),
    pageStyle: styles.pageStyle,
    documentTitle: patientData?.person.display,
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handlePrint = async () => {
    await delay(500);
    printRef();
  };

  const formatDate = (date) => {
    if (!date) return "";

    return dayjs(date).format("DD.MM.YYYY");
  };

  const trimIdentifierDisplay = (displayValue) => {
    return displayValue ? displayValue.split("=")[1]?.trim() : "";
  };

  // Trim OpenMRS ID
  const openMRSId = trimIdentifierDisplay(patientData?.identifiers[0]?.display);

  // Trim Unique ART Number
  const uniqueARTNumber = trimIdentifierDisplay(
    patientData?.identifiers[1]?.display
  );

  return (
    <div className={styles.bodyContainer} ref={componentRef}>
      {printMode === true && <PrintComponent />}
      <div className={styles.card}>
        <div
          className={isTablet ? styles.tabletHeading : styles.desktopHeading}
        >
          <h4 className={styles.title}>
            {" "}
            {t("patientSummary", "Patient summary")}
          </h4>
          {printMode === false && (
            <Button
              size="sm"
              className={styles.btnShow}
              onClick={() => {
                handlePrint(), setPrintMode(true);
              }}
              kind="tertiary"
              renderIcon={(props) => <Printer size={16} {...props} />}
              iconDescription={t("print", "Print")}
            >
              {t("print", "Print")}
            </Button>
          )}
        </div>
        {patientData && (
          <>
            <div className={styles.container}>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("patientName", "Patient name")}
                </p>
                <p>
                  <span className={styles.value}>
                    {patientData.person.display}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("uniquePatientIdentifier", "Unique patient identifier")}
                </p>
                <p>
                  <span className={styles.value}>{openMRSId}</span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("uniqueArtNumber", "Unique ART Number")}
                </p>
                <p>
                  <span className={styles.value}>{uniqueARTNumber}</span>
                </p>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.content}>
                <p className={styles.label}>{t("birthDate", "Birth date")}</p>
                <p>
                  <span className={styles.value}>
                    {formatDate(patientData.person.birthdate)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>{t("age", "Age")}</p>
                <p>
                  <span className={styles.value}>
                    {age(patientData.person.birthdate)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>{t("gender", "Gender")}</p>
                <p>
                  <span className={styles.value}>
                    {patientData.person.gender === "M" ? "Male" : "Female"}
                  </span>
                </p>
              </div>
            </div>

            <hr />

            <div className={styles.container}>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("dateOfEnrollment", "Date of Enrollment")}
                </p>
                <p>{(data.results[0]?.enrollmentDate)}</p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("latestArvRegimen", "Latest ARV Regimen")}
                </p>
                <p className={styles.value}>
                  {(data.results[0]?.arvRegimen)}
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("lastCD4Count", "Last CD4 count")}
                </p>
                <p>
                  <span className={styles.value}>
                    {(data.results[0]?.lastCD4Count)}
                  </span>
                </p>
              </div>
            </div>

            <hr />

            <div className={styles.container}>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("lastTBStatus", "Last TB status")}
                </p>
                <p>
                  {" "}
                  <span className={styles.value}>
                    {(data.results[0]?.tbStatus)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("lastArvRegimenDose", "Last ARV Regimen Dose")}
                </p>
                <p>
                  <span className={styles.value}>
                    {(data.results[0]?.arvRegimenDose)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("nextVisitDate", "Next Visit Date")}
                </p>
                <p>
                  <span className={styles.value}>
                    {(data.results[0]?.nextVisitDate)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("whoHivClinicalStage", "WHO HIV Clinical Stage")}
                </p>
                <p>
                  <span className={styles.value}>
                    {(data.results[0]?.whoClinicalStage)}
                  </span>
                </p>
              </div>
            </div>

            <hr />

            <div className={styles.container}>
              <div className={styles.content}>
                <p className={styles.label}>{t("weight", "Weight")}</p>
                <p>
                  <span className={styles.value}>
                    {(data.results[0]?.weight)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>{t("height", "Height")}</p>
                <p>
                  <span className={styles.value}>
                    {(data.results[0]?.height)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>{t("bmi", "BMI")}</p>
                <p>
                  <span className={styles.value}>
                    {(data.results[0]?.bmi)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>{t("muac", "MUAC")}</p>
                <p>
                  <span className={styles.value}>
                    {(
                      data.results[0]?.muac
                    )}
                  </span>
                </p>
              </div>
            </div>

            <hr />

            <div className={styles.container}>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("drugAllergies", "Drug allergies")}
                </p>
                <p>
                  <span className={styles.value}>--</span>
                </p>
              </div>
            </div>

            <hr />

            <div className={styles.container}>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("clinicalNotes", "Clinical notes")}
                </p>
                <p>
                  <span className={styles.value}>--</span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("clinicianName", "Clinician name")}
                </p>
                <p>
                  <span className={styles.value}>
                    {currentUserSession?.user?.person?.display
                      ? currentUserSession?.user?.person?.display
                      : t("none", "None")}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("clinicianSignature", "Clinician signature")}
                </p>
                <p>
                  <span className={styles.value}>
                    {currentUserSession?.user?.person?.display
                      ? currentUserSession?.user?.person?.display
                      : t("none", "None")}
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientSummary;
