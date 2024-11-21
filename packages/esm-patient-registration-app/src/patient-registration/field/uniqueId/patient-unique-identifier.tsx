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
import { openmrsFetch } from "@openmrs/esm-framework";
import { ResourcesContext } from "../../../offline.resources";
import { findFacilityMetadata } from "../../helpers/findFacilityMetadata";

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
  id: string;
  name: string;
  labelText: string;
  light: boolean;
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
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
  const [allFacilities, setAllFacilities] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [selectedState, setSelectedState] = useState<string>("State1");
  const [selectedFacility, setSelectedFacility] = useState<string>("");
  const [artNumber, setArtNumber] = useState<string>("");
  const [facilitiesForSelectedState, setfacilitiesForSelectedState] = useState<
    string[]
  >([""]);
  const [transferIn, setTransferIn] = useState(false);

  const [combinedValue, setCombinedValue] = useState<string>("");

  const { currentSession } = useContext(ResourcesContext);

  const location = currentSession?.sessionLocation?.display;

  async function* fetchLocationsWithPagination(url: string) {
    let hasMorePages = true;
    let currentUrl = url;

    while (hasMorePages) {
      try {
        const { data } = await openmrsFetch(`${currentUrl}`);
        yield data.results;
        /**
         * check if there's a next page based on the returned links (or pagination attributes)
         *
         */
        if (data?.links?.length > 0 && data.links[0].rel === "next") {
          currentUrl = data.links[0].uri.split("openmrs")[1];
        } else {
          hasMorePages = false;
        }
      } catch (e) {
        hasMorePages = false;
      }
    }
  }

  const getAllFacilities = async () => {
    const generator = fetchLocationsWithPagination(
      `/ws/rest/v1/location?tag=Login Location`
    );

    for await (const states of generator) {
      setAllFacilities((prev) => [...prev, ...states]);
    }
  };

  const getAllStates = async () => {
    const generator = fetchLocationsWithPagination(
      `/ws/rest/v1/location?tag=South Sudan States`
    );

    for await (const states of generator) {
      setAllStates((prev) => [...prev, ...states]);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { data } = await openmrsFetch(`/ws/rest/v1/location/${location}`);
      const metadata = findFacilityMetadata(data.display);
      if (metadata) {
        setSelectedState(metadata.state);
        setSelectedFacility(metadata.facility.code);
      }
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    getAllStates();
    getAllFacilities();
    getCurrentLocation();
  }, [transferIn]);

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

  const { changeART } = useContext(CustomFieldsContext);

  useEffect(() => {
    const value = `${transferIn ? "TI-" : ""}${selectedFacility}${artNumber}`;
    setCombinedValue(value);
    changeART(value);
  }, [selectedFacility, artNumber, transferIn]);

  useEffect(() => {
    if (selectedState) {
      setfacilitiesForSelectedState(facilities[0][selectedState]);
    }
  }, [selectedState]);

  // TO-DO - Extract patientUuid from the URL
  const segments = window.location.pathname.split("/");

  // TO-DO - Check if the URL pattern has edit
  const shouldRenderSection = segments.includes("edit");

  return (
    <div>
      {!shouldRenderSection && (
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
                  disabled={!transferIn}
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
                  disabled={!transferIn}
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
                  id="artNumber"
                  name="artNumber"
                  labelText={t("number", "Number")}
                  light={true}
                  required={true}
                />
              </Layer>
            </Tile>
          </div>
          <div>ART Number: {combinedValue}</div>
        </div>
      )}
    </div>
  );
};
