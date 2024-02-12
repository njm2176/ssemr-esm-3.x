import React, { useState, createContext } from "react";

export const ARTContext = createContext(null);

const ArtProvider = ({ children }) => {
  const [artNumber, setARTNumber] = useState("");

  const changeART = (number: string) => {
    setARTNumber(number);
  };

  return (
    <ARTContext.Provider value={{ artNumber, changeART }}>
      {children}
    </ARTContext.Provider>
  );
};

export default ArtProvider;
