import { useMemo } from "react";
import useObservationData from "./useObservationData";
import { WarningIcon } from "@openmrs/esm-framework";

interface Notification {
  id: number;
  message: string;
}

const usePatientNotifications = (patientUuid?: string) => {
  const { data, isLoading, error } = useObservationData(patientUuid);

  const notifications: Notification[] = useMemo(() => {
    if (!data || !data.results || !data.results.length) return [];

    const observation = data.results[0];
    if (!observation) return [];

    let idCounter = 1;
    const notificationsList: Notification[] = [];

    const observationRules = [
      {
        condition: (obs: any) => obs.cd4Done === null,
        message: "CD4 count was not done. Please perform CD4 count.",
      },
      {
        condition: (obs: any) =>
          obs.vlResults && parseFloat(obs.vlResults) >= 1000,
        message:
          "Patient's viral load is Unsuppressed. Consider EAC and possible regimen change.",
      },
      {
        condition: (obs: any) => obs.tbStatus === "ND - TB Screening not done",
        message:
          "TB screening was not done. Perform a TB screening for the patient.",
      },
      {
        condition: (obs: any) => obs.tbStatus === "Pr TB - Presumptive TB",
        message: "Presumptive TB, test for Urine LAM / GeneXpert.",
      },
      {
        condition: (obs: any) =>
          obs.whoClinicalStage === "Stage 3" ||
          obs.whoClinicalStage === "Stage 4",
        message:
          "CLient has WHO stage 3 or 4. Risk of cryptococcal Meningitis, test for sCrAg.",
      },
    ];

    observationRules.forEach((rule) => {
      if (rule.condition(observation)) {
        notificationsList.push({
          id: idCounter++,
          message: rule.message,
        });
      }
    });

    const indexFamilyMembers = observation.indexFamilyMembers;
    if (indexFamilyMembers && indexFamilyMembers.length > 0) {
      indexFamilyMembers.forEach((member: any) => {
        if (member.hivStatusKnown === "Unknown" && member.relationship) {
          if (member.relationship === "Child" && member.age < 15) {
            notificationsList.push({
              id: idCounter++,
              message:
                "Client has a Child with unknown HIV status, please test the child.",
            });
          } else if (member.relationship === "Sexual") {
            notificationsList.push({
              id: idCounter++,
              message:
                "Client has sexual partner with unknown HIV status, please test the contact.",
            });
          }
        }
      });
    }

    return notificationsList;
  }, [data]);

  return {
    notifications,
    isLoading,
    error,
  };
};

export default usePatientNotifications;
