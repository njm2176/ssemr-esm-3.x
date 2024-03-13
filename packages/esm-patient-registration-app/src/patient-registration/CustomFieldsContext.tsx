import React, { useState, createContext, useEffect } from "react";

export const CustomFieldsContext = createContext(null);

const CustomFieldsProvider = ({ children }) => {
  const [artNumber, setARTNumber] = useState("");
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

  const changeART = (number: string) => {
    setARTNumber(number);
  };

  useEffect(() => {
    console.log("phones", phones);
  }, [phones]);

  return (
    <CustomFieldsContext.Provider
      value={{ artNumber, changeART, phones, setPhones }}
    >
      {children}
    </CustomFieldsContext.Provider>
  );
};

export default CustomFieldsProvider;
