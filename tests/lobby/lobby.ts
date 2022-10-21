import { LobbyLocator } from "./locators/index";
import { configs } from "./configs/config";
import { Page } from "@playwright/test";

export const ssoToGame = async (page: Page, gameId: number = 2) => {
    const env = process.env.npm_config_env ?? "local";
    const config = configs[env]
    if (env.includes("local")) {
        if (config.gameAccounts[gameId] == null) {
            throw new Error(`Please setup testing account with game id ${gameId} first.`);
        }
        const memberId = config.gameAccounts[gameId][0]; //TODO could use chance pickone
        const memberSiteLink = `${config.memberSite}?obCustId=${memberId}&balance=20000`;
        await page.goto(memberSiteLink);
        const ssoLink = (await page.locator(LobbyLocator.ssoLink).textContent()) ?? "";
        await page.goto(`${ssoLink.replace("gameId=0", `gameId=${gameId}`)}`);
    }

    //UAT, SIT , PROD
     else{
        await ssofrommemberSite(page, config, env, gameId);
    }
};

export const getConfig = (): any => {
    const env = process.env.npm_config_env ?? "local";
    return configs[env];
};

export const ssofrommemberSite = async (page: Page, config: any, env: string, gameId: number) => {
    // Go to Membersite Url
    await page.goto(config.memberSite);
    await page.waitForLoadState();
    if (env == "uat") {
        await loginUAT(page, config, gameId);
    }
    if (env == "prod") {
        await loginPROD(page, config, gameId);
    }
    if (env =="sit") {
        await loginSIT(page, config, gameId);
    }
    await page.waitForTimeout(1000);
    const sabalink =
        env == "prod"
            ? page
                  .url()
                  .toString()
                  .replace(/\/[Ss]ports/g, "") +
              config.lobbyDomain +
              config.mapGameId[gameId]
            : page.url().toString().replace("demo:one23@", "").replace("Sports/","") + config.lobbyDomain + config.mapGameId[gameId];
    await page.goto(sabalink)
    await page.waitForLoadState();

    // select group currency
    if (env == "prod") {
        await page.selectOption('xpath=//*/select[@id="group"]', { value: "61b048d27e6d8f000145357f" });
    }
    await page.click('xpath=//input[@value="Submit"]');
    await page.waitForLoadState();
    await page.waitForTimeout(15000);
};

export const loginUAT = async (page: Page, config: any, gameId: number) => {
    await page.click("id=LoginDiv");
    await page.selectOption("id=Langid", { value: "vi-VN" });
    await page.fill("id=Username", config.gameAccounts[gameId][0]);
    await page.fill("id=Password", "1234aaAA");
    await page.click("id=LoginBtn");
    await page.waitForLoadState();
};

export const loginPROD = async (page: Page, config: any, gameId: number) => {
    await page.fill("id=txtID", config.gameAccounts[gameId][0]);
    await page.fill("id=txtPW", "1234aa");
    await page.click("//a[contains(@class,'btn btn')]");
    await page.waitForLoadState();
};

export const loginSIT = async (page: Page, config: any, gameId: number) => {
    await page.fill("id=txtID", config.gameAccounts[gameId][0]);
    await page.fill("id=txtPW", "1234aaAA");
    await page.click("//button");
    await page.waitForLoadState();
    await page.click("//div[contains(@class,'c-dropdown--lang')]")
    await page.click("//div[contains(text(),'Tiếng Việt')]")
};