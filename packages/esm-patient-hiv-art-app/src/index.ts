import {
  defineConfigSchema,
  getAsyncLifecycle,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { moduleName } from "./constants";
import { configSchema } from "./config-schema";
import { dashboardMeta, homeDashboardMeta } from "./dashboard.meta";
import { createDashboardLink } from "@openmrs/esm-patient-common-lib";
import { createDashboardLink as createHomeDashboardLink } from "./DashboardLink";

const options = {
  featureName: "esm-patient-hiv-art-app",
  moduleName,
};

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const rootHome = getAsyncLifecycle(
  () => import("./root.component"),
  options
);

export const homeHIVCareAndARTLink =
  // t('HIV Care & ART', 'HIV Care & ART')
  getSyncLifecycle(createHomeDashboardLink(homeDashboardMeta), options);

export const hivArtTreatmentDashboardLink =
  // t('HIV & ART Treatment', 'HIV & ART Treatment')
  getSyncLifecycle(
    createDashboardLink({
      ...dashboardMeta,
      moduleName,
    }),
    options
  );
