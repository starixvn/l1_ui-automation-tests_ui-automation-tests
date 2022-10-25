import { LobbyLocator } from "./locators/index";
import { configs } from "./configs/config";
import { Page } from "@playwright/test";

export enum Environment {
    LOCAL = "local",
    LOCAL1 = "local1",
    LOCAL2 = "local2",
    LOCAL3 = "local3",
    SIT = "sit",
    UAT = "uat",
    PROD = "prod",
}

export const ssoToGame = async (page: Page, gameId: number = 2): Promise<void> => {
    const env = process.env.npm_config_env ?? Environment.LOCAL;
    const config = getConfig();

    if (config.gameAccounts[gameId] == null) {
        throw new Error(`Missing test account for game id ${gameId}!!!`);
    }

    if (env.includes("local")) {
        const memberId = config.gameAccounts[gameId][0]; //TODO could use chance pickone
        const memberSiteLink = `${config.memberSite}?obCustId=${memberId}&balance=20000`;
        await page.goto(memberSiteLink);
        const ssoLink = (await page.locator(LobbyLocator.ssoLink).textContent()) ?? "";

        await page.goto(`${ssoLink.replace("gameId=0", `gameId=${gameId}`)}`);
    } else {
        await loginMemberSite(page, config, env, gameId);
    }
};

export const getConfig = (): any => {
    const env = process.env.npm_config_env ?? Environment.LOCAL;

    return configs[env];
};

const loginMemberSite = async (page: Page, config: any, env: string, gameId: number) => {
    // Go to Membersite Url
    await page.goto(config.memberSite);
    await page.waitForLoadState("domcontentloaded", { timeout: 15000 });

    switch (env) {
        case Environment.UAT:
            await loginUAT(page, config.gameAccounts[gameId][0]);
            break;

        case Environment.PROD:
            await loginPROD(page, config.gameAccounts[gameId][0]);
            break;

        default:
            await loginSIT(page, config.gameAccounts[gameId][0]);
    }

    await goToGameLobby(page, env, config, gameId);
    await selectGroupCurrency(page, env);
};

const formatGameLobbyUrl = (env: string, url: string, lobbyDomain: string, operatorGameType: number): string => {
    const formattedLink = env === Environment.PROD ? url : url.replace("demo:one23@", "");

    return `${formattedLink.replace(/\/[Ss]ports/g, "")}${lobbyDomain}${operatorGameType}`;
};

const selectGroupCurrency = async (page: Page, env: string) => {
    if (env === Environment.PROD) {
        await page.selectOption('xpath=//*/select[@id="group"]', { value: "61b048d27e6d8f000145357f" });
    }

        await page.click('xpath=//input[@value="Submit"]');
    await page.waitForLoadState("domcontentloaded", { timeout: 15000 });
};

const loginUAT = async (page: Page, accountId: string) => {
    await page.click("id=LoginDiv");
    await page.selectOption("id=Langid", { value: "vi-VN" });
    await page.fill("id=Username", accountId);
    await page.fill("id=Password", "1234aaAA");
    await page.click("id=LoginBtn");
    await page.waitForLoadState("domcontentloaded");
};

const loginPROD = async (page: Page, accountId: string) => {
    await page.fill("id=txtID", accountId);
    await page.fill("id=txtPW", "1234aa");
    await page.click("//a[contains(@class,'btn btn')]");
    await page.waitForLoadState("domcontentloaded");
};

const loginSIT = async (page: Page, accountId: string) => {
    await page.fill("id=txtID", accountId);
    await page.fill("id=txtPW", "1234aaAA");
    await page.click("//button");
    await page.waitForLoadState("domcontentloaded");
    await page.click("//div[contains(@class,'c-dropdown--lang')]");
    await page.click("//div[contains(text(),'Tiếng Việt')]");
};

const goToGameLobby = async (page: Page, env: string, config: any, gameId: number) => {
    await page.goto(formatGameLobbyUrl(env, page.url(), config.lobbyDomain, config.mapGameId[gameId]));
    await page.waitForLoadState("domcontentloaded", { timeout: 15000 });
};
