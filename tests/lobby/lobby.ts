import { LobbyLocator } from "./locators/index.ts";
import { configs } from "./configs/config.ts";

import { chromium } from "@playwright/test";

export const getLoginUrl = async (gameId: number = 2): Promise<string> => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    //TODO should load by env since different env will have different way to get login URL
    const env = process.env.npm_config_env ?? "local";
    const memberId = configs[env].gameAccounts[gameId][0]; //TODO could use chance pickone
    const memberSiteLink = `${configs[env].memberSite}?obCustId=${memberId}`;

    await page.goto(memberSiteLink);

    const ssoLink = (await page.locator(LobbyLocator.ssoLink).textContent()) ?? "";

    return `${ssoLink.replace("gameId=0", `gameId=${gameId}`)}`;
};
