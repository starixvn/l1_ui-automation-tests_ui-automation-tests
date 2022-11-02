import type { Page } from "@playwright/test";
import type { WebSocket as PlaywrightWs } from "playwright-core";
import { ImageLocator, ImageSnapshot } from "./base-image-locator";
import { GameConfiguration } from "./game-configuration";
import { ssoToGame, getConfig } from "./../lobby/lobby";

import { waitForMessage, parseSocketPayload } from "./../_shared/socket-helpers";
import { GameEvent } from "./../_shared/events";

export class BaseGame {
    readonly LobbyTimeout: number = 40000;

    readonly page: Page;
    readonly locators: Array<ImageLocator>;
    readonly gameConfiguration: GameConfiguration;

    msgpack: boolean;
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
        await ssoToGame(this.page, this.gameConfiguration.id);
        this.msgpack = getConfig().enabledMsgPack;
        this.page.on("websocket", async (ws) => {
            if (ws.url().includes(this.gameConfiguration.socketName ?? this.gameConfiguration.name.toLowerCase())) {
                this.gameSocket = ws;

                ws.on("framereceived", async (msg: any) => {
                    const { payload } = msg ?? "";
                    
                    if (this.odds === null && payload.includes(GameEvent.GameConfig)) {
            
                        const ingameResponse = parseSocketPayload(this.gameConfiguration.name, payload, this.msgpack).message;                       
                        this.odds = ingameResponse.gameConfigs.odds;
                        
                    }

                    Object.keys(this.capturedEvents)?.forEach((event) => {
                        if (payload.includes(event)) {
                            this.capturedEvents[event] = parseSocketPayload(this.gameConfiguration.name, payload, this.msgpack).message;
                        }
                    });
                });
            }
        });
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
        return await waitForMessage(this.gameSocket, message, this.gameConfiguration.name, this.msgpack);
    }

    async waitUntilNextRound(gameName:string = this.gameConfiguration.name): Promise<any> {
        this.capturedEvents[GameEvent.WinStatus] = "";

        return await waitForMessage(this.gameSocket, GameEvent.StartRound, gameName, this.msgpack);
    }

    async waitUntilPlaceBet(duration: any = this.gameConfiguration.durations,gameName:string = this.gameConfiguration.name ): Promise<void> {
        const { wholeRound, placingBets } = duration;
        await this.waitUntilNextRound(gameName);
        await this.page.waitForTimeout(wholeRound - placingBets);
    }

    async waitForEndBet(gameName:string = this.gameConfiguration.name): Promise<any> {
        return await waitForMessage(this.gameSocket, GameEvent.EndBet, gameName, this.msgpack);
    }

    async waitForSettlement(gameName:string = this.gameConfiguration.name): Promise<any> {
        const message = await waitForMessage(this.gameSocket, GameEvent.Settlement,gameName, this.msgpack);
        const winningByChoice = this.latestCaptureEvent(GameEvent.WinStatus);

        const settledResults = {
            settlementResult: message?.finish?.settlementResult,
            winAmount: winningByChoice?.status?.bet ?? 0,
            odds: this.odds,
        };

        return settledResults;
    }

    async waitForTimeout(time: number = 5000): Promise<void> {
        await this.page.waitForTimeout(time);
    }

    async capture(locatorName: string): Promise<ImageSnapshot> {
        const locator = this.locator(locatorName);

        return locator ? await locator.snapshot(this.page) : Promise.resolve({ name: "", image: Buffer.from("") });
    }

    async captureDealer(): Promise<ImageSnapshot> {
        return this.capture("dealer");
    }

    async captureChoice(choice: string): Promise<ImageSnapshot> {
        return this.capture(`${choice}Choice`);
    }

    async captureOwnbet(choice: string): Promise<ImageSnapshot> {
        return this.capture(`${choice}Ownbet`);
    }

    async captureHistory(): Promise<ImageSnapshot> {
        return this.capture(`historyPopup`);
    }

    async clickToChoice(choice: string): Promise<void> {
        const locator = this.locator(`${choice}Choice`);

        if (locator) {
            await locator.click(this.page);
        }
    }

    async clickLocator(element: string): Promise<void> {
        const locator = this.locator(element);
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

    async captureErrorMessage(): Promise<ImageSnapshot> {
        return this.capture(`errorMessage`);
    }
}
