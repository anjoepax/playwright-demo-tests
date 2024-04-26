import {expect, test} from "@playwright/test";
import StorePage from "@src/pages/store.page";
import ProductPage from "@src/pages/product.page";
import CartPage from "@src/pages/cart.page";

test.describe("Add to cart tests", {tag: ["@sanityTests", "@addToCartTest"]}, () => {

    let storePage: StorePage;

    test.beforeEach(async ({page}) => {
        storePage = new StorePage(page);
        await storePage.open();
    });

    test("should add product to the cart from store page", async ({page}) => {
        await storePage.searchForProduct('Blue');
        await storePage.addToCart('Blue Shoes');

        const cartPage = new CartPage(page);
        await cartPage.open();
        await expect(cartPage.productName).toHaveText('Blue Shoes');
    });

    test("should add product to the cart from product page", async ({page}) => {
        let searchTerm = 'Blue Shoes';
        await storePage.searchForProduct(searchTerm);

        const productPage = new ProductPage(page);
        await productPage.clickAddToCartButton();

        const cartPage = new CartPage(page);
        await cartPage.open();
        await expect(cartPage.productName).toHaveText(searchTerm);
    });
});