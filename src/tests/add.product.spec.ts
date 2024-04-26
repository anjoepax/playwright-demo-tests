import {test, expect} from "@playwright/test";
import HomePage from "@src/pages/home.page";
import StorePage from "@src/pages/store.page";
import GlobalHeaderPage from "@src/pages/global.header.page";
import CartPage from "@src/pages/cart.page";

test.describe("Add product tests", () => {
    test("Add random product in the cart and verify if product is added in the cart page",
        {tag:"@flaky"}, async ({ page }) => {
        await page.goto('/');
        const homePage = new HomePage(page);
        await homePage.navigateToTab('Store');

        //Adding product to the cart
        //Adding 4 random products to the cart
        const storePage = new StorePage(page);
        await storePage.addRandomProductToTheCart();
        await storePage.addRandomProductToTheCart();
        await storePage.addRandomProductToTheCart();
        await storePage.addRandomProductToTheCart();
        await storePage.clickViewCartLink();
        await page.waitForTimeout(3_000);

        //Verify correct number of product in the cart
        const globalHeader = new GlobalHeaderPage(page);
        await expect(globalHeader.cartIcon).toContainText('4');

        //Print product name and product quantity
        const cartPage = new CartPage(page);
        await cartPage.printProductNames();
        await cartPage.printProductQuantities();
    });
});