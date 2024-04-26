import CartPage from "@src/pages/cart.page";
import {getCustomerData} from "@src/data/random.data";
import {expect, test} from "@playwright/test";
import StorePage from "@src/pages/store.page";
import ProductPage from "@src/pages/product.page";

test.describe("Checkout tests", {tag: ["@sanityTests", "@checkoutTest"]}, () => {
    test("guest checkout using direct bank transfer",
        async ({page}) => {
            const storePage = new StorePage(page);
            await storePage.open();
            await storePage.searchForProduct('Blue');
            await storePage.addToCart('Blue Shoes');

            const cartPage = new CartPage(page);
            await cartPage.open();
            const checkoutPage = await cartPage.goToCheckoutPage();
            await checkoutPage.open();
            await checkoutPage.fillUpBillingDetails(getCustomerData());
            await checkoutPage.clickPlaceOrderButton();
            await expect(checkoutPage.orderSuccessMsg).toHaveText(
                'Thank you. Your order has been received.'
            );
        });

    test("login and checkout using direct bank transfer",
        async ({page}) => {
            const storePage = new StorePage(page);
            await storePage.open();
            await storePage.searchForProduct('Blue Shoes');

            const productPage = new ProductPage(page);
            await productPage.clickAddToCartButton();

            const cartPage = new CartPage(page);
            await cartPage.open();
            const checkoutPage = await cartPage.goToCheckoutPage();
            await checkoutPage.open();

            //Login before placing order
            await checkoutPage.login();
            await checkoutPage.clickPlaceOrderButton();
            await expect(checkoutPage.orderSuccessMsg).toHaveText(
                'Thank you. Your order has been received.'
            );
        });
});