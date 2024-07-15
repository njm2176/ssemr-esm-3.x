import {
  defineConfigSchema,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config/config-schema";
import { createDashboardLink } from "./components/link/createDashboardLink.component";
import { dashboardMeta } from "./config/dashboard.meta";
import { setupOffline } from "./config/offline";
import rootComponent from "./root.component";

const moduleName = "@ssemr/esm-patient-list-management-app";

const options = {
  featureName: "client lists",
  moduleName,
};

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export function startupApp() {
  setupOffline();
  defineConfigSchema(moduleName, configSchema);
}

export const root = getSyncLifecycle(rootComponent, options);

export const patientListDashboardLink = getSyncLifecycle(
  createDashboardLink(dashboardMeta),
  options
);
