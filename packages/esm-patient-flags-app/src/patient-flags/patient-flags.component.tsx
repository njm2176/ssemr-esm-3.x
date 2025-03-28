import React, {useMemo} from "react";
import { Tag } from "@carbon/react";
import { useTranslation } from "react-i18next";
import { usePatientFlags } from "../hooks/usePatientFlags";
import styles from "./patient-flags.scss";
import useObservationData from "../hooks/useObservationData";

interface PatientFlagsProps {
  patientUuid: string;
}

const PatientFlags: React.FC<PatientFlagsProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { patientFlags, error } = usePatientFlags(patientUuid);
  const { data: observationData } = useObservationData(patientUuid);
  const observation = observationData?.results?.[0];

  const filteredFlags = useMemo(() => {
    if (observation && observation.chw && observation.chw.length > 0) {
      return patientFlags.filter(
        (flag) => !["NEW_CLIENT", "HIGH_VL", "RTT"].includes(flag)
      );
    }
    return patientFlags;
  }, [patientFlags, observation]);

  const pickTagClassname = (flag: string) => {
    switch (flag) {
      case "ACTIVE":
        return "greenTag";
      case "ELIGIBLE":
        return "greenTag";
      case "IIT":
        return "mustardTag";
      case "DIED":
        return "redTag";
      case "MISSED_APPOINTMENT":
        return "redTag";
      case "NOT_ELIGIBLE":
        return "redTag";
      case "TRANSFERRED_OUT":
        return "mustardTag";
      case "DUE_FOR_VL":
        return "greenTag";
      case "NEW_CLIENT":
        return "redTag";
      case "HIGH_VL":
        return "redTag";
      case "RTT":
        return "redTag";
      default:
        return "tag";
    }
  };

  const getDisplayText = (flag: string) => {
    switch (flag) {
      case "NEW_CLIENT":
        return "NEW CLIENT: Prioritize linkage to CHW";
      case "HIGH_VL":
        return "HIGH VL: Prioritize linkage to CHW";
      case "RTT":
        return "RTT: Prioritize linkage to CHW";
      default:
        return flag.replaceAll("_", " ");
    }
  };

  if (error) {
    return (
      <span>
        {t("errorPatientFlags", "Error loading patient flags")}
      </span>
    );
  }

  return (
    <div className={styles.flagContainer}>
      {filteredFlags.map((patientFlag) => (
        <Tag
          className={styles[pickTagClassname(patientFlag)]}
          key={patientFlag}
        >
          {getDisplayText(patientFlag)}
        </Tag>
      ))}
    </div>
  );
};

export default PatientFlags;

