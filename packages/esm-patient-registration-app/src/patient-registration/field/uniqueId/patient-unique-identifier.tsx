/* eslint-disable no-console */
import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  Tile,
  Layer,
  Select,
  SelectItem,
  TextInput,
  Checkbox,
} from "@carbon/react";
import styles from "./patient-unique-identifier.scss";
import { FormikProps, FormikValues } from "formik";
import { facilities } from "./assets/identifier-assets";
import { CustomFieldsContext } from "../../CustomFieldsContext";

interface PatientIdentifierProps {
  props: FormikProps<FormikValues>;
  id: string;
  name: string;
  labelText: string;
  light: boolean;
  disabled?: boolean;
  placeholder?: string;
  value: string;
}

interface CustomInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  id: string;
  name: string;
  labelText: string;
  light: boolean;
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  onBlur,
  id,
  name,
  labelText,
  light,
  required = false,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <TextInput
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      id={id}
      name={name}
      labelText={labelText}
      light={light}
      required={required}
    />
  );
};

export { CustomInput };

export const PatientArtNumber: React.FC<PatientIdentifierProps> = () => {
  const { t } = useTranslation();

  const states = Object.keys(facilities[0]);
  const [selectedState, setSelectedState] = useState<string>("State1");
  const [selectedFacility, setSelectedFacility] = useState<string>("");
  const [artNumber, setArtNumber] = useState<string>("");
  const [facilitiesForSelectedState, setfacilitiesForSelectedState] = useState<
    string[]
  >([""]);
  const [transferIn, setTransferIn] = useState(false);

  const [combinedValue, setCombinedValue] = useState<string>("");

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setSelectedFacility("");
  };

  const handleFacilityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newFacility = event.target.value;
    setSelectedFacility(newFacility);
  };

  const handleArtNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newArtNumber = event.target.value;
    setArtNumber(newArtNumber);
  };

  const handleBlur = () => {
    console.log("Input blurred");
  };

  const { changeART } = useContext(CustomFieldsContext);

  useEffect(() => {
    const value = `${transferIn ? "TI-" : ""}${selectedFacility}${artNumber}`;
    setCombinedValue(value);
    changeART(value);
  }, [selectedFacility, artNumber, transferIn]);

  //To-Do
  useEffect(() => {
    if (selectedState) {
      setfacilitiesForSelectedState(facilities[0][selectedState]);
    }
  }, [selectedState]);

  return (
    <div id="patientIdentifier">
      <h6
        className={styles.productiveHeading01}
        style={{ color: "#161616", marginTop: "1rem" }}
      >
        {t("uniqueArtNumber", "Unique ART Number")}
      </h6>
      <div>
        <Tile className={styles.wrapper}>
          <Checkbox
            value={transferIn}
            onChange={() => setTransferIn((prev) => !prev)}
            labelText="Transfer In"
            id="transfer"
          />
        </Tile>
        <Tile className={styles.wrapper}>
          <Layer>
            <Select
              value={selectedState}
              onChange={handleStateChange}
              id="states"
              labelText={t("states", "State")}
            >
              <SelectItem value="" text="" />
              {states.map((state) => (
                <SelectItem value={state} text={state} key={state} />
              ))}
            </Select>
          </Layer>
          <Layer>
            <Select
              value={selectedFacility}
              onChange={handleFacilityChange}
              id="facility"
              labelText={t("facilities", "Facilities")}
            >
              <SelectItem value="" text="" />
              {facilitiesForSelectedState?.map((facility: any) => (
                <SelectItem
                  value={facility?.code}
                  text={facility?.name}
                  key={facility?.code}
                />
              ))}
            </Select>
          </Layer>
          <Layer>
            <CustomInput
              value={artNumber}
              onChange={handleArtNumberChange}
              onBlur={handleBlur}
              id="artNumber"
              name="artNumber"
              labelText={t("number", "Number")}
              light={true}
              required={false}
            />
          </Layer>
        </Tile>
      </div>
      <div>ART Number: {combinedValue}</div>
    </div>
  );
};
