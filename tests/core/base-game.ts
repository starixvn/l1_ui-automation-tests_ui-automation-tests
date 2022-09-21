import type { Page } from "@playwright/test";
import type { WebSocket as PlaywrightWs } from "playwright-core";
import { ImageLocator } from "./base-image-locator.ts";
import { GameConfiguration } from "./game-configuration.ts";
import { getLoginUrl } from "./../lobby/lobby.ts";

import { waitForMessage } from "./../_shared/socket-helpers.ts";
import { GameEvent } from "./../_shared/events.ts";

export class BaseGame {
    readonly LobbyTimeout: number = 15000;

    readonly page: Page;
    readonly locators: Array<ImageLocator>;
    readonly gameConfiguration: GameConfiguration;

    gameSocket: PlaywrightWs;

    constructor(page: Page, locators: Array<ImageLocator>, gameConfiguration: GameConfiguration) {
        this.page = page;
        this.locators = locators;
        this.gameConfiguration = gameConfiguration;
    }

    async login() {
        const loginUrl = await getLoginUrl(this.gameConfiguration.id);
        this.page.on("websocket", async (ws) => {
            if (ws.url().includes(this.gameConfiguration.name.toLowerCase())) {
                this.gameSocket = ws;
            }
        });

        await this.page.goto(loginUrl);
        await this.page.waitForTimeout(this.LobbyTimeout);
    }

    async waitForMessage(message: string): Promise<string> {
        return await waitForMessage(this.gameSocket, message, this.gameConfiguration.name);
    }

    async waitUntilNextRound(): Promise<string> {
        return await waitForMessage(this.gameSocket, GameEvent.StartRound, this.gameConfiguration.name);
    }

    async waitUntilPlaceBet() {
        const { wholeRound, placingBets } = this.gameConfiguration;
        await this.waitUntilNextRound();
        await this.page.waitForTimeout(wholeRound - placingBets);
    }

    async waitForTimeout(time: number) {
        await this.page.waitForTimeout(time);
    }

    async captureDealer(): Promise<any> {
        return this.locators["dealer"] ? await this.locators["dealer"].snapshot(this.page) : Promise.resolve(null);
    }

    async captureChoice(choice: string): Promise<any> {
        const locatorName = `${choice}Choice`;

        return this.locators[locatorName] ? await this.locators[locatorName].snapshot(this.page) : Promise.resolve(null);
    }

    async captureOwnbet(choice: string): Promise<any> {
        const locatorName = `${choice}Ownbet`;

        return this.locators[locatorName] ? await this.locators[locatorName].snapshot(this.page) : Promise.resolve(null);
    }

    async clickToChoice(choice: string) {
        const locatorName = `${choice}Choice`;

        await this.locators[locatorName].click(this.page);
        await this.waitForTimeout(500);
    }
}
