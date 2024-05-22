import { Page } from "@playwright/test";

export class HomePage {
  constructor(readonly page: Page) {}

  async gotoHome() {
    await this.page.goto("home");
  }
}

export class FacilityDashboard {
  constructor(readonly page: Page) {}
  async gotoFacilityDashboard() {
    await this.page.goto("/openmrs/spa/home/hivcare-and-art");
  }
}
