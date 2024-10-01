import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import PatientSummary from "./patient-summary.component";
import usePatientData from "../hooks/usePatientData";
import useObservationData from "../hooks/useObservationData";
import { useTranslation } from "react-i18next";
import { useSession, age } from "@openmrs/esm-framework";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

jest.mock("../hooks/usePatientData");
jest.mock("../hooks/useObservationData");
jest.mock("react-i18next");
jest.mock("@openmrs/esm-framework", () => ({
  useSession: jest.fn(),
  age: jest.fn(),
}));
jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    setFontSize: jest.fn(),
    text: jest.fn(),
    addImage: jest.fn(),
    output: jest.fn().mockResolvedValue("pdf-blob"),
  }));
});
jest.mock("html2canvas");

describe("PatientSummary component", () => {
  const mockPatientUuid = "patient-uuid";
  const mockCode = "code";
  const mockPatientData = {
    person: {
      display: "John Doe",
      birthdate: "1980-01-01",
      gender: "M",
    },
    identifiers: [
      { display: "OpenMRS ID = ABC123" },
      { display: "ART Number = XYZ456" },
    ],
  };

	const mockObservationData = {
    results: [
      {
        enrollmentDate: "2022-01-01",
        arvRegimen: "Regimen 1",
        lastCD4Count: "500",
        tbStatus: "No TB",
        arvRegimenDose: "200mg",
        appointmentDate: "2022-12-01",
        whoClinicalStage: "Stage 1",
        lastRefillDate: "2022-06-01",
        dateVLResultsReceived: "2022-07-01",
        vlResults: "Undetectable",
        vlStatus: "Suppressed",
        chwName: "Jane Doe",
        chwPhone: "1234567890",
        chwAddress: "123 Main St",
        clinicianName: "Dr. Smith",
        bmi: "24",
      },
    ],
  };

	const mockUseTranslation = () => ({
    t: (key: string) => key,
  });

	beforeEach(() => {
    (usePatientData as jest.Mock).mockReturnValue({
      patientData: mockPatientData,
      Loading: false,
      isError: false,
    });

    (useObservationData as jest.Mock).mockReturnValue({
      data: mockObservationData,
      isLoading: false,
      error: false,
    });

    (useTranslation as jest.Mock).mockImplementation(mockUseTranslation);
    (useSession as jest.Mock).mockReturnValue({
      session: { user: { display: "Dr. Admin" } },
    });
    (age as jest.Mock).mockReturnValue("40");
  });

	it("renders patient summary with correct data", () => {
    render(<PatientSummary patientUuid={mockPatientUuid} code={mockCode} />);

    // Check that the patient's name, age, and gender are rendered correctly
    expect(screen.getByText("patientName")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("age")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();
    expect(screen.getByText("gender")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();

    // Check that the Unique ART Number and OpenMRS ID are displayed
    expect(screen.getByText("uniquePatientIdentifier")).toBeInTheDocument();
    expect(screen.getByText("ABC123")).toBeInTheDocument();
    expect(screen.getByText("uniqueArtNumber")).toBeInTheDocument();
    expect(screen.getByText("XYZ456")).toBeInTheDocument();

    // Check observation fields
    expect(screen.getByText("dateOfEnrollment")).toBeInTheDocument();
    expect(screen.getByText("2022-01-01")).toBeInTheDocument();
    expect(screen.getByText("latestArvRegimen")).toBeInTheDocument();
    expect(screen.getByText("Regimen 1")).toBeInTheDocument();
  });

	// it("handles print functionality", async () => {
  //   // Mock html2canvas to return an object that has toDataURL method
  //   (html2canvas as jest.Mock).mockResolvedValue({
  //     toDataURL: jest.fn().mockReturnValue("data:image/png;base64,xyz"),
  //   });

  //   // Render the component
  //   render(<PatientSummary patientUuid="patient-uuid" code="code" />);

  //   const printButton = screen.getByText("print");
  //   fireEvent.click(printButton);

  //   await waitFor(() => expect(html2canvas).toHaveBeenCalled());

  //   // Ensure jsPDF instance methods are called
  //   const pdfInstance = new jsPDF();
  //   expect(pdfInstance.setFontSize).toHaveBeenCalledWith(12);
  //   expect(pdfInstance.text).toHaveBeenCalledWith("John Doe", 50, 50);
  //   expect(pdfInstance.addImage).toHaveBeenCalled();
  //   expect(pdfInstance.output).toHaveBeenCalledWith("blob");
  // });
})