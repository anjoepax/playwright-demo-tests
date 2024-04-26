import {Page} from "@playwright/test";
import StorePage from "@src/pages/store.page";

class HomePage {
    constructor(private readonly page: Page) {
    }

    // private readonly homeLink = this.page.locator("");

    async navigateToTab(tabName: string) {
        await this.page.locator(`(//a[text()='${tabName}'])[1]`).click();
    }

    async open() {
        await this.page.goto(`/`);
    }
}

export default HomePage;
