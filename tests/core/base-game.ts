import type { Page } from "@playwright/test";
import type { WebSocket as PlaywrightWs } from "playwright-core";
import { ImageLocator } from "./base-image-locator";
import { GameConfiguration } from "./game-configuration";
import { getLoginUrl } from "./../lobby/lobby";

import { waitForMessage, parseSocketPayload } from "./../_shared/socket-helpers";
import { GameEvent } from "./../_shared/events";

export class BaseGame {
    readonly LobbyTimeout: number = 40000;

    readonly page: Page;
    readonly locators: Array<ImageLocator>;
    readonly gameConfiguration: GameConfiguration;

    gameSocket: PlaywrightWs;
    capturedEvents: any;
    odds: any = null;

    constructor(page: Page, locators: Array<ImageLocator>, gameConfiguration: GameConfiguration) {
        this.page = page;
        this.locators = locators;
        this.gameConfiguration = gameConfiguration;
        this.capturedEvents = {};
    }

    async login() {
        const loginUrl = await getLoginUrl(this.gameConfiguration.id);
        this.page.on("websocket", async (ws) => {
            if (ws.url().includes(this.gameConfiguration.name.toLowerCase())) {
                this.gameSocket = ws;

                ws.on("framereceived", async (msg: any) => {
                    const { payload } = msg ?? "";

                    if (this.odds === null && payload.includes(GameEvent.GameConfig)) {
                        const ingameResponse = parseSocketPayload(this.gameConfiguration.name, payload).message;
                        this.odds = ingameResponse.gameConfigs.odds;
                    }

                    Object.keys(this.capturedEvents)?.forEach((event) => {
                        if (payload.includes(event)) {
                            this.capturedEvents[event] = parseSocketPayload(this.gameConfiguration.name, payload).message;
                        }
                    });
                });
            }
        });

        await this.page.goto(loginUrl);
        await this.page.waitForTimeout(this.LobbyTimeout);
    }

    attachSocketAndCaptureEvent(event: string) {
        this.capturedEvents[event] = "";
    }

    latestCaptureEvent(event: string): any | undefined {
        const message = this.capturedEvents[event];
        delete this.capturedEvents[event];

        return message;
    }

    async waitForMessage(message: string): Promise<any> {
        return await waitForMessage(this.gameSocket, message, this.gameConfiguration.name);
    }

    async waitUntilNextRound(): Promise<any> {
        return await waitForMessage(this.gameSocket, GameEvent.StartRound, this.gameConfiguration.name);
    }

    async waitUntilPlaceBet() {
        const { wholeRound, placingBets } = this.gameConfiguration.durations;
        await this.waitUntilNextRound();
        await this.page.waitForTimeout(wholeRound - placingBets);
    }

    async waitForEndBet(): Promise<any> {
        return await waitForMessage(this.gameSocket, GameEvent.EndBet, this.gameConfiguration.name);
    }

    async waitForSettlement(): Promise<any> {
        return await waitForMessage(this.gameSocket, GameEvent.Settlement, this.gameConfiguration.name);
    }

    async waitForTimeout(time: number) {
        await this.page.waitForTimeout(time);
    }

    async captureDealer(): Promise<any> {
        const locator = this.locator(`dealer`);

        return locator ? await locator.snapshot(this.page) : Promise.resolve(null);
    }

    async captureChoice(choice: string): Promise<any> {
        const locator = this.locator(`${choice}Choice`);

        return locator ? await locator.snapshot(this.page) : Promise.resolve(null);
    }

    async captureOwnbet(choice: string): Promise<any> {
        const locator = this.locator(`${choice}Ownbet`);
        return locator ? await locator.snapshot(this.page) : Promise.resolve(null);
    }

    async captureHistory(): Promise<any> {
        const locator = this.locator(`historyPopup`);
        return locator ? await locator.snapshot(this.page) : Promise.resolve(null);
    }

    async clickToChoice(choice: string) {
        const locator = this.locator(`${choice}Choice`);

        if (locator) {
            await locator.click(this.page);
        }
    }

    locator(name: string): ImageLocator | undefined {
        return this.locators.find((x) => x.name === name);
    }

    async clickHistory(): Promise<void> {
        if (this.locator("hamburgerMenu")) {
            await this.locator("hamburgerMenu")?.click(this.page);
            await this.waitForTimeout(500);
        }

        await this.locator("historyMenu")?.click(this.page);
        await this.waitForTimeout(500);
    }

    async captureErrorMessage(): Promise<any> {
        const locator = this.locator(`errorMessage`);
        return locator ? await locator.snapshot(this.page) : Promise.resolve(null);
    }
}
