import {test, expect} from "@playwright/test";

test.describe("Reuse state tests", {tag: "@reuseState"}, () => {
    test("Reuse test 1", async ({page}) => {
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        await expect(page.locator("span[class='oxd-userdropdown-tab']")).toBeVisible();
        await page.waitForTimeout(5_000);
    });

    test("Reuse test 2", async ({page}) => {
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        await expect(page.locator("span[class='oxd-userdropdown-tab']")).toBeVisible();
        await page.waitForTimeout(5_000);
    });

    test("Reuse test 3", async ({page}) => {
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        await expect(page.locator("span[class='oxd-userdropdown-tab']")).toBeVisible();
        await page.waitForTimeout(5_000);
    });
});