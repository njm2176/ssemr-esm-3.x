import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Button } from "@carbon/react";
import {
  useLayoutType,
  useSession,
  age,
} from "@openmrs/esm-framework";
import { Printer } from "@carbon/react/icons";
import PrintComponent from "../print-layout/print.component";
import styles from "./patient-summary.scss";
import usePatientData from "../hooks/usePatientData";
import useObservationData from "../hooks/useObservationData";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/primary-navigation-ssemr.png"

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

  const hideButtton = () => {
    document.querySelectorAll('.no-print').forEach(el  => (el as HTMLElement).style.display = 'none');
  }

  const getNumberOfPages = () => {
    return document.querySelectorAll('.page-break').length
  }
  const handlePrint = async () => {
    setPrintMode(true);
    const canvas = await html2canvas(componentRef.current);
    const imgData = canvas.toDataURL("image/png");

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });


    doc.setFontSize(8);
    doc.text(`${dayjs().format("DD/MM/YYYY, HH:mm")}`, 450, 50);
    doc.setFontSize(12);
    doc.text(`${patientData?.person.display}`, 50, 50);

    const logoImage = logo
    doc.addImage(logoImage, "PNG", 20, 60, 100, 50);

    const imgWidth = 500;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    doc.addImage(imgData, "PNG", 40, 110, imgWidth, imgHeight);

    // Add footer content with page number
    const pageCount = getNumberOfPages();
    doc.setFontSize(4);
    doc.text(`Page ${pageCount} of ${pageCount}`, 500, 800);

    const pdfBlob = await doc.output("blob");

    const pdfUrl = URL.createObjectURL(pdfBlob);

    const previewWindow = window.open(pdfUrl, "_blank");
    previewWindow?.focus();

    componentRef.current.style.fontSize = "";

    setPrintMode(false);
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

  const bmiMuac = () => {
    if (data.results[0]?.bmi){
      return data.results[0]?.bmi
    }else if(data.results[0]?.muac){
      return data.results[0]?.muac
    }else{
      return "---"
    }
  }

  const displayField = (field, defaultValue = "---") => field ?? defaultValue;

  if (isLoading) return <p>Loading...</p>;
  if (error || !data || !data.results) return <p>Error loading data</p>;

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
              className={`${styles.btnShow} no-print`}
              onClick={() => {
                hideButtton();
                handlePrint();
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
              <div className={styles.patientSummary}>
                <p className={styles.label}>
                  {t("patientName", "Patient name")}
                </p>
                <p>
                  <span className={styles.value}>
                    {patientData.person.display}
                  </span>
                </p>
              </div>
              <div className={styles.patientSummary}>
                <p className={styles.label}>
                  {t("uniquePatientIdentifier", "Unique patient identifier")}
                </p>
                <p>
                  <span className={styles.value}>{openMRSId}</span>
                </p>
              </div>
              <div className={styles.patientSummary}>
                <p className={styles.label}>
                  {t("uniqueArtNumber", "Unique ART Number")}
                </p>
                <p>
                  <span className={styles.value}>{uniqueARTNumber}</span>
                </p>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.patientSummary}>
                <p className={styles.label}>{t("birthDate", "Birth date")}</p>
                <p>
                  <span className={styles.value}>
                    {formatDate(patientData.person.birthdate)}
                  </span>
                </p>
              </div>
              <div className={styles.patientSummary}>
                <p className={styles.label}>{t("age", "Age")}</p>
                <p>
                  <span className={styles.value}>
                    {age(patientData.person.birthdate)}
                  </span>
                </p>
              </div>
              <div className={styles.patientSummary}>
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
                <p>{displayField(data.results[0]?.enrollmentDate)}</p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("latestArvRegimen", "Latest ARV Regimen")}
                </p>
                <p>
                  {displayField(data.results[0]?.arvRegimen)}
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("lastCD4Count", "Last CD4 count")}
                </p>
                <p>
                  <span>
                    {displayField(data.results[0]?.lastCD4Count)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
            <p className={styles.label}>
              {displayField("bmiMuac", "BMI/MUAC")}
              </p>
            <p>
              <span>
                {bmiMuac()}
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
                  <span>
                    {displayField(data.results[0]?.tbStatus)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("lastArvRegimenDose", "Last ARV Regimen Dose")}
                </p>
                <p>
                  <span>
                    {displayField(data.results[0]?.arvRegimenDose)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("nextVisitDate", "Next Visit Date")}
                </p>
                <p>
                  <span>
                    {displayField(data.results[0]?.nextVisitDate)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                  {t("whoHivClinicalStage", "WHO HIV Clinical Stage")}
                </p>
                <p>
                  <span>
                    {displayField(data.results[0]?.whoClinicalStage)}
                  </span>
                </p>
              </div>
            </div>

            <hr />

            <div className={styles.container}>
              <div className={styles.content}>
                <p className={styles.label}>
                {t("lastArvRefillDate", "Last ARV Refill Date")}
                </p>
                <p>
                  {" "}
                  <span>
                    {displayField(data.results[0]?.lastRefillDate)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                {t("dateVLRecieved", "Date Viral Load Results Received")}
                </p>
                <p>
                  <span>
                    {displayField(data.results[0]?.dateVLResultsReceived)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                {t("lastVLResult", "Last VL Result")}
                </p>
                <p>
                  <span>
                    {displayField(data.results[0]?.vlResults)}
                  </span>
                </p>
              </div>
              <div className={styles.content}>
                <p className={styles.label}>
                {t("vlStatus", "VL Status")}
                </p>
                <p>
                  <span>
                    {displayField(data.results[0]?.vlStatus === "Unknown" ? "---" : data.results[0]?.vlStatus)}
                  </span>
                </p>
              </div>
            </div>

            <hr />

            <div className={styles.container}>
              <div className={styles.patientSummary}>
                <p className={styles.label}>
                {t("nameOfCHW", "Name of the Community Health Worker (CHW)")}
                </p>
                <p>
                  {" "}
                  <span>
                    {displayField(data.results[0]?.chwName)}
                  </span>
                </p>
              </div>
              <div className={styles.patientSummary}>
                <p className={styles.label}>
                {t("telephoneNumber", "Telephone Number")}
                </p>
                <p>
                  <span>
                    {displayField(data.results[0]?.chwPhone)}
                  </span>
                </p>
              </div>
              <div className={styles.patientSummary}>
                <p className={styles.label}>
                {t(
                "chwAddress",
                "LandMark/Address Of Community Health Worker (CHW)"
              )}
                </p>
                <p>
                  <span>
                    {displayField(data.results[0]?.chwAddress)}
                  </span>
                </p>
              </div>
            </div>

            {/* <div className={styles.container}>
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
              
            </div> */}

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
