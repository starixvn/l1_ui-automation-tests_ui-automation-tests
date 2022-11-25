import type { Page } from "@playwright/test";
import type { WebSocket as PlaywrightWs } from "playwright-core";
import { ImageLocator, ImageSnapshot } from "./base-image-locator";
import { GameConfiguration } from "./game-configuration";
import { ssoToGame, getConfig } from "./../lobby/lobby";

import { waitForMessage, parseSocketPayload } from "./../_shared/socket-helpers";
import { GameEvent } from "./../_shared/events";

export class BaseGame {
    readonly LobbyTimeout: number = 40000;
    readonly BetBoardPostfix: string = "BetBoard";

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
                        const ingameResponse = parseSocketPayload(payload, this.msgpack).message;
                        this.odds = ingameResponse.gameConfigs.odds;
                    }

                    Object.keys(this.capturedEvents)?.forEach((event) => {
                        if (payload.includes(event)) {
                            this.capturedEvents[event] = parseSocketPayload(payload, this.msgpack).message;
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

    private getGameName(subGameName?: string): string {
        return subGameName ?? this.gameConfiguration.name;
    }

    async waitForMessage(message: string, subGameName?: string): Promise<any> {
        return await waitForMessage(this.gameSocket, message, this.getGameName(subGameName), this.msgpack);
    }

    async waitUntilNextRound(subGameName?: string): Promise<any> {
        this.capturedEvents[GameEvent.WinStatus] = "";

        return await waitForMessage(this.gameSocket, GameEvent.StartRound, this.getGameName(subGameName), this.msgpack);
    }

    async waitUntilPlaceBet(subGameName?: string): Promise<void> {
        const { wholeRound, placingBets } = this.gameConfiguration.durations;
        await this.waitUntilNextRound(subGameName);
        await this.page.waitForTimeout(wholeRound - placingBets);
    }

    async waitForEndBet(subGameName?: string): Promise<any> {
        return await waitForMessage(this.gameSocket, GameEvent.EndBet, this.getGameName(subGameName), this.msgpack);
    }

    async waitForDeal(subGameName?: string): Promise<any> {
        return await waitForMessage(this.gameSocket, GameEvent.Deal, this.getGameName(subGameName), this.msgpack);
    }

    async waitForEndDeal(subGameName?: string): Promise<any> {
        return await waitForMessage(this.gameSocket, GameEvent.EndDeal, this.getGameName(subGameName), this.msgpack);
    }

    async waitForStandBet(subGameName?: string): Promise<any> {
        return await waitForMessage(this.gameSocket, GameEvent.Stand, this.getGameName(subGameName), this.msgpack);
    }

    async waitForSettlement(subGameName?: string): Promise<any> {
        const message = await waitForMessage(this.gameSocket, GameEvent.Settlement, this.getGameName(subGameName), this.msgpack);
        const winningByChoice = this.latestCaptureEvent(GameEvent.WinStatus);
        let settledResults = {
            settlementResult: message?.finish?.settlementResult,
            odds: this.odds,
        };
        if (this.gameConfiguration.slotsgame) {
            settledResults["winAmount"] = message?.finish?.betWin ?? 0;
        } else {
            settledResults["winAmount"] = winningByChoice.win ? winningByChoice?.status?.bet : 0;
        }
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
        const postfix = this.gameConfiguration.betBoard ? this.BetBoardPostfix : "";
        const locator = this.locator(`${choice}Choice${postfix}`);
        if (locator) {
            await locator.click(this.page);
        }
    }

    async clickToSlotsChoice(choice: string): Promise<void> {
        await this.locator("choiceMenu")?.click(this.page);
        await this.waitForTimeout(500);
        await this.locator("clearChoices")?.click(this.page);
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

    async clickStake(amount: number = 1): Promise<void> {
        await this.locator(`stake${amount}`)?.click(this.page);
    }

    async clickStand(): Promise<void> {
        await this.waitForTimeout(6000);
        await this.locator("standcard")?.click(this.page);
    }

    async clickHit(): Promise<void> {
        await this.locator("hitcard")?.click(this.page);
    }
    async clickSlotsStake(amount: number = 1): Promise<void> {
        await this.locator("stakeMenu")?.click(this.page);
        await this.waitForTimeout(500);
        await this.locator(`stake${amount}`)?.click(this.page);
    }

    async clickSubmitBet(): Promise<void> {
        await this.waitForTimeout(500);
        await this.locator(`submit${this.BetBoardPostfix}`)?.click(this.page);
    }

    async clickSpin(): Promise<void> {
        await this.waitForTimeout(500);
        await this.locator("spin")?.click(this.page);
    }

    async clickOutSide(): Promise<void> {
        await this.locator("outside")?.click(this.page);
        await this.waitForTimeout(500);
    }
}
