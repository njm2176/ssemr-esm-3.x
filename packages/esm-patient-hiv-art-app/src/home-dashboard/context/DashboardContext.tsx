import React, { createContext, useState } from "react";

export const DashboardContext = createContext(null);
const DashboardProvider = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <DashboardContext.Provider value={{ data, setData }}>
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardProvider;
