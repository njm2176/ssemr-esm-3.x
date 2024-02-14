import React, { createContext, useState } from "react";

export const DashboardContext = createContext(null);
const DashboardProvider = ({ children }) => {
  const [filters, setFilters] = useState("");

  return (
    <DashboardContext.Provider value={{ setFilters, filters }}>
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardProvider;
