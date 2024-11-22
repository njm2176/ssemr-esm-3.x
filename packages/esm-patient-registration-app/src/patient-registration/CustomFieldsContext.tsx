import React, { useState, createContext } from "react";

export const CustomFieldsContext = createContext(null);

const CustomFieldsProvider = ({ children }) => {
  const [artNumber, setARTNumber] = useState({
    identifierValue: "",
    identifierUuid: null,
  });
  const [phones, setPhones] = useState({
    primary: {
      dial_code: "",
      code: "",
      number: "",
    },
    secondary: {
      dial_code: "",
      code: "",
      number: "",
    },
  });

  const changeART = (identifierValue: string, identifierUuid?: string) => {
    setARTNumber((prev) => ({
      ...prev,
      identifierValue: identifierValue,
      ...(identifierUuid && { identifierUuid }),
    }));
  };

  return (
    <CustomFieldsContext.Provider
      value={{ artNumber, changeART, phones, setPhones }}
    >
      {children}
    </CustomFieldsContext.Provider>
  );
};

export default CustomFieldsProvider;
