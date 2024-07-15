import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListsDashboard from "./views/client-lists.component";

const RootComponent: React.FC = () => {
  const patientListsBasename =
    window.getOpenmrsSpaBase() + "home/patient-lists";

  return (
    <BrowserRouter basename={patientListsBasename}>
      <Routes>
        <Route path="/" element={<ListsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootComponent;
