import {test, expect} from "@playwright/test";
import HomePage from "@src/pages/home.page";
import StorePage from "@src/pages/store.page";
import ProductPage from "@src/pages/product.page";

test.describe("Search product tests", {tag: ["@sanityTests", "@productSearchTest"]}, () => {

    test.beforeEach(async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.open();
        await homePage.navigateToTab('Store');
    });

    test("should search using partial match", async ({page}) => {
        const storePage = new StorePage(page);
        await storePage.searchForProduct('Blue');
        await storePage.verifyProductNameTextContains('Blue')
    });

    test("should search using exact match", async ({page}) => {
        let searchTerm = 'Blue Shoes';
        const storePage = new StorePage(page);
        await storePage.searchForProduct(searchTerm);

        const productPage = new ProductPage(page);
        await expect(productPage.productLabel).toHaveText(searchTerm);
    });
});