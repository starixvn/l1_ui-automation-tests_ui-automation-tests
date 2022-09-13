import { test, expect } from "@playwright/test";
import { LobbyLocator } from "./locators/index.ts";
import { imageType, formatScreenshotFile } from "./../_shared/screenshotHelpers.ts";
import { configs } from "./configs/index.ts";

test("Test lobby", async ({ page }) => {
    // Arrange
    const memberId = configs.local.memberId;
    const memberSiteLink = `${configs.local.memberSite}?obCustId=${memberId}`;
    const lobbyTimeout = configs.local.lobbyTimeout;
    const lobbyDomain = configs.local.lobbyDomain;

    await page.goto(memberSiteLink);

    // Act
    const token = await page.locator(LobbyLocator.tokenInput).textContent();
    const ssoLink = (await page.locator(LobbyLocator.ssoLink).textContent()) ?? "";

    // Assert
    expect(token).not.toBeNull();
    expect(ssoLink).toContain(`${lobbyDomain}?token=${token}`);

    await page.goto(ssoLink);
    await page.waitForTimeout(lobbyTimeout);

    await page.screenshot({ path: formatScreenshotFile("lobby"), type: imageType });
});
