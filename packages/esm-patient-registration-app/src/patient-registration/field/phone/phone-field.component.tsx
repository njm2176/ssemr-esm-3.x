import React, { useState } from "react";
import styles from "../field.scss";
import { Input } from "../../input/basic-input/input/input.component";
import { SelectInput } from "../../input/basic-input/select/select-input.component";
import { useTranslation } from "react-i18next";
import { countryCodes } from "./country-codes";
import { FormValues } from "../../patient-registration.types";
import { PatientRegistrationContext } from "../../patient-registration-context";
import { CustomFieldsContext } from "../../CustomFieldsContext";
import { Select, SelectItem, TextInput } from "@carbon/react";

interface InputProps {
  id: string;
  name: string;
  labelText: string;
  light: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export const PhoneField: React.FC<InputProps> = () => {
  const { values } = React.useContext(PatientRegistrationContext);
  const { phones, setPhones } = React.useContext(CustomFieldsContext);
  const { t } = useTranslation();

  const [countryCode, setCountryCode] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [altCountryCode, setAltCountryCode] = useState("");
  const [altPhoneValue, setAltPhoneValue] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [altPhoneError, setAltPhoneError] = useState("");

  const handleCountryCodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCountryCode = event.target.value;
    setCountryCode(selectedCountryCode);
    setPhoneValue(selectedCountryCode);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d{9}$/.test(value)) {
      setPhoneValue(value);
      setPhoneError("");
    } else {
      setPhoneError("Phone number must be 9 digits");
    }
  };

  const handleAltCountryCodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCountryCode = event.target.value;
    setAltCountryCode(selectedCountryCode);
    setAltPhoneValue(selectedCountryCode);
  };

  const handleAltPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d{9}$/.test(value)) {
      setAltPhoneValue(value);
      setAltPhoneError("");
    } else {
      setAltPhoneError("Phone number must be 9 digits");
    }
  };

  const handlePrimaryCountryCode = (evt) => {
    // regex to extract text within parentheses
    const regex = /\((.*?)\)/g;
    const inputValue = evt.target.value;
    setPhones((prev) => ({
      ...prev,
      primary: {
        ...prev.primary,
        dial_code: inputValue,
        code: regex.exec(inputValue)[1],
      },
    }));
  };

  const handlePrimaryNumber = (evt) => {
    const inputValue = evt.target.value;
    const regex = /^[0-9\b]+$/;
    if (inputValue === "" || regex.test(inputValue))
      setPhones((prev) => ({
        ...prev,
        primary: {
          ...prev.primary,
          number: evt.target.value,
        },
      }));
  };

  const handleSecondaryCountryCode = (evt) => {
    // regex to extract text within parentheses
    const regex = /\((.*?)\)/g;
    const inputValue = evt.target.value;
    setPhones((prev) => ({
      ...prev,
      secondary: {
        ...prev.secondary,
        dial_code: inputValue,
        code: regex.exec(inputValue)[1],
      },
    }));
  };

  const handleSecondaryNumber = (evt) => {
    const inputValue = evt.target.value;
    const regex = /^[0-9\b]+$/;
    if (inputValue === "" || regex.test(inputValue))
      setPhones((prev) => ({
        ...prev,
        secondary: {
          ...prev.secondary,
          number: evt.target.value,
        },
      }));
  };

  return (
    <div className={styles.phoneFieldContainer}>
      <div className={styles.fieldRow}>
        <div className={styles.countryCode}>
          <Select
            onChange={handlePrimaryCountryCode}
            value={phones.primary.dial_code}
          >
            {countryCodes.map((country) => (
              <SelectItem
                key={country.code}
                value={country.dial_code}
                text={country.dial_code}
              />
            ))}
          </Select>
        </div>
        <div className={styles.fieldColumn}>
          <TextInput
            id="phone"
            name="TelephoneNumber"
            labelText={t(
              "phoneNumberInputLabelText",
              "Clients Telephone Number"
            )}
            light={true}
            value={phones.primary.number}
            onChange={handlePrimaryNumber}
          />
          {phoneError && <div className={styles.error}>{phoneError}</div>}
        </div>
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.countryCode}>
          <Select
            onChange={handleSecondaryCountryCode}
            value={phones.secondary.dial_code}
          >
            {countryCodes.map((country) => (
              <SelectItem
                key={country.code}
                value={country.dial_code}
                text={country.dial_code}
              />
            ))}
          </Select>
        </div>
        <div className={styles.fieldColumn}>
          <TextInput
            id="phone"
            name="TelephoneNumber"
            labelText={t(
              "phoneNumberInputLabelText",
              "Clients Telephone Number"
            )}
            light={true}
            value={phones.secondary.number}
            onChange={handleSecondaryNumber}
          />
          {phoneError && <div className={styles.error}>{phoneError}</div>}
        </div>
      </div>
    </div>
  );
};
