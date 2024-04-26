import { defineConfig, devices } from '@playwright/test';
import {config} from "dotenv";
import {Env} from "@src/config/env";

if (process.env.ENVIRONMENT) {
  console.log('ENVIRONMENT: ', process.env.ENVIRONMENT);
  config({
    path: `.env.${process.env.ENVIRONMENT}`,
    override: true,
  });
}else {
  config();
}

export default defineConfig({
  //testDir: './src/tests/sanity',
  testDir: './src/tests',
  //globalSetup: './global.setup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: Env.BASE_URL,
    trace: 'on-first-retry',
    video: "on",
    launchOptions: {
      slowMo: 500
    },
    storageState: "./loginState.json"
  },
  timeout: 60000,

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: undefined,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        }
      },
    }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
