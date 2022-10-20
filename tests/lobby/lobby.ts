import { LobbyLocator } from "./locators/index";
import { configs } from "./configs/config";

export const ssoToGame = async (page:any , gameId: number = 2) => {
    const env = process.env.npm_config_env ?? "local";
    if (env.includes('local')) {
        const config = getConfig();
        const memberId = config.gameAccounts[gameId][0]; //TODO could use chance pickone
        const memberSiteLink = `${config.memberSite}?obCustId=${memberId}&balance=20000`;
        await page.goto(memberSiteLink);
        const ssoLink = (await page.locator(LobbyLocator.ssoLink).textContent()) ?? "";
        await page.goto( `${ssoLink.replace("gameId=0", `gameId=${gameId}`)}`)
    }
 
    //UAT, SIT , PROD
    if (!env.includes('local')) {
            // Login Member Site
    const config = getConfig();
    await ssofrommemberSite(page,config,env,gameId);
    }
   
};

export const getConfig = (): any => {
    const env = process.env.npm_config_env ?? "local";
    return configs[env];
};


export const ssofrommemberSite = async(page:any, config: any, env: string,gameId: number) => {
    // Login for SIT/UAT/PRO
        // Go to Membersite Url
        await page.goto(config.memberSite);
        await page.waitForLoadState()
        // Login Membersite UAT
        if(env == 'uat'){
            await page.click('id=LoginDiv')
            await page.selectOption('id=Langid', { value : 'vi-VN' })
            await page.fill('id=Username',config.gameAccounts[gameId][0]) 
            await page.fill('id=Password','1234aa')
            await page.click('id=LoginBtn')
            await page.waitForLoadState()
        }
         // Login Membersite prod
        if(env == 'prod'){
            await page.fill("id=txtID",config.gameAccounts[gameId][0]) 
            await page.fill('id=txtPW','1234aa') 
            await page.click("//a[contains(@class,'btn btn')]")
            await page.waitForLoadState()
        } 
        await page.waitForTimeout(1000);
        let sabalink = (env == "prod")? page.url().toString().replace(/\/[Ss]ports/g, "") + config.lobbyDomain + config.mapGameId[gameId]: page.url().toString().replace("#lobby", "#ThirdPartyGame") + config.lobbyDomain  + config.mapGameId[gameId]
        await page.goto(sabalink);
        await page.waitForLoadState()
        // select group currency
        if (env == "prod") {
            await page.selectOption('xpath=//*/select[@id="group"]', { value: "61b048d27e6d8f000145357f" });
        } 
        await page.click('xpath=//input[@value="Submit"]');
        await page.waitForLoadState()
        await page.waitForTimeout(15000);       
    }
