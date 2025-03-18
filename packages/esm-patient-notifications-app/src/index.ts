import {
  defineConfigSchema,
  getAsyncLifecycle,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import NotificationsActionButton from "./notification-action-button/notification-action-button.extension";
import NotificationToastWrapper from "./notification-wrapper/notification-toast-wrapper.component";

const moduleName = "@ssemr/esm-patient-notifications-app";

const options = {
  featureName: "notifications",
  moduleName,
};

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);
// export const navbarButtons = getSyncLifecycle(NavbarActionButton, options);

// export const patientFlag = getSyncLifecycle(patientFlagsComponent, options);

export const notificationsLaunchButton = getSyncLifecycle(
  NotificationToastWrapper,
  options
);

export const notificationWorkspace = getAsyncLifecycle(
  () => import("./notification-workspace/notification-workspace.component"),
  options
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}
