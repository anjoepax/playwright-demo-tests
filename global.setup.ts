import {expect, chromium} from "@playwright/test";

module.exports = async () => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", {name: "Login"}).click();
    await expect(page.locator("span[class='oxd-userdropdown-tab']")).toBeVisible({timeout: 10_000});

    //Save the state of the webpage
    await page.context().storageState({path: "./loginState.json"});
    await browser.close();
}