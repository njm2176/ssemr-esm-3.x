import React, { useState } from "react";
import styles from "../field.scss";
import { Input } from "../../input/basic-input/input/input.component";
import { SelectInput } from "../../input/basic-input/select/select-input.component";
import { useTranslation } from "react-i18next";
import { countryCodes } from "./country-codes";
import { FormValues } from "../../patient-registration.types";
import { PatientRegistrationContext } from "../../patient-registration-context";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(phoneValue);
    console.log(altPhoneValue);
  };

  return (
    <div className={styles.phoneFieldContainer}>
      <div className={styles.fieldRow}>
        <div className={styles.countryCode}>
          <SelectInput
            name="mobileCountryCode"
            options={countryCodes.map((code) => code.dial_code)}
            label={t("countryCode", "Country Code")}
            onChange={handleCountryCodeChange}
            value={""}
          />
        </div>
        <div className={styles.fieldColumn}>
          <Input
            id="phone"
            name="TelephoneNumber"
            labelText={t(
              "phoneNumberInputLabelText",
              "Clients Telephone Number"
            )}
            light={true}
            value={phoneValue}
            onChange={handlePhoneChange}
          />
          {phoneError && <div className={styles.error}>{phoneError}</div>}
        </div>
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.countryCode}>
          <SelectInput
            name="alternativeMobileCountryCode"
            options={countryCodes.map((code) => code.dial_code)}
            label={t("countryCode", "Country Code")}
            onChange={handleAltCountryCodeChange}
            value={""}
          />
        </div>
        <div className={styles.fieldColumn}>
          <Input
            id="altPhone"
            name="alternativeTelephonePhone"
            labelText={t(
              "phoneNumberInputLabelText",
              "Alternative Telephone Number"
            )}
            light={true}
            value={altPhoneValue}
            onChange={handleAltPhoneChange}
          />
          {altPhoneError && <div className={styles.error}>{altPhoneError}</div>}
        </div>
      </div>
    </div>
  );
};
