import CartPage from "@src/pages/cart.page";
import {getCustomerData} from "@src/data/random.data";
import {expect, test} from "@playwright/test";
import StorePage from "@src/pages/store.page";

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
});