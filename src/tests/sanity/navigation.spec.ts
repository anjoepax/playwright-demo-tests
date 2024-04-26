import {test, expect} from "@playwright/test";
import HomePage from "@src/pages/home.page";
import StorePage from "@src/pages/store.page";

test.describe("Page navigation tests", {tag: ["@sanityTests", "@navigationTest"]}, () => {
    test("should navigate from home page to store page using main menu", async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.open();
        await homePage.navigateToTab('Store');

        const storePage = new StorePage(page);
        await expect(storePage.storePageTitle).toHaveText('Store')
    });
});