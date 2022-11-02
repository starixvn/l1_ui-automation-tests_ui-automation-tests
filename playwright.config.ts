import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import * as customExpect from "./tests/core/expects/expect-settlement-options";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const gameId = process.env.npm_config_game ?? "2";

const config: PlaywrightTestConfig = {
    testDir: "./tests",
    timeout: 120 * 1000,
    expect: {
        timeout: 10 * 1000,
        toMatchSnapshot: {
            maxDiffPixelRatio: 0.06,
        },
    },
    /* Run tests in files in parallel */
    fullyParallel: false,
    reporter: [["html", { open: "never" }]],
    use: {
        actionTimeout: 0,
        trace: "on-first-retry",
        headless: false,
        viewport: {
            width: 1280,
            height: 720,
        },
        screenshot: "only-on-failure",
        launchOptions: {
            // force GPU hardware acceleration (even in headless mode)
            // without hardware acceleration, our tests will be much slower
            args: ["--use-gl=egl"],
        },
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "Smoke_CI",
            testMatch: `**/${gameId}-*/tests/*.smoke.spec.ts`,
            use: {
                ...devices["Desktop Chrome"],
            },
        },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    // outputDir: 'test-results/',
};

export default config;
