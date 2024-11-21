import { facilities } from "../field/uniqueId/assets/identifier-assets";

interface Facility {
  name: string;
}

export const findFacilityMetadata = (facilityName: string) => {
  for (const [state, facilitiesList] of Object.entries(facilities[0])) {
    const foundFacility = facilitiesList.find(
      (facility: Facility) => facility.name === facilityName
    );
    if (foundFacility) {
      return { state, facility: foundFacility };
    }
  }
  return null;
};
