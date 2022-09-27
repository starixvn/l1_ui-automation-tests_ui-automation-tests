import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    testDir: "./tests",
    timeout: 60 * 1000,
    expect: {
        timeout: 10 * 1000,
    },
    /* Run tests in files in parallel */
    fullyParallel: false,
    reporter: "html",
    use: {
        actionTimeout: 0,
        trace: "on-first-retry",
        headless: true,
        viewport: {
            width: 1280,
            height: 720,
        },
        screenshot: "only-on-failure",
        launchOptions: {
            // force GPU hardware acceleration (even in headless mode)
            // without hardware acceleration, our tests will be much slower
            args: ["--use-gl=egl"],
            channel: "chrome",
        },
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "Smoke",
            testMatch: /.*smoke.spec.ts/,
            use: {
                ...devices["Desktop Chrome"],
            },
        },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    // outputDir: 'test-results/',
};

export default config;
