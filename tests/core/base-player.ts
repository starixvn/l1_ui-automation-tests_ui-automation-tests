import { GameEvent } from "../_shared/events";
import { BaseGame } from "./base-game";

export class BasePlayer {
    readonly game: BaseGame;

    constructor(game: BaseGame) {
        this.game = game;
    }

    async placeHedgeBet(hedgeChoices: string[], amount: number = 1): Promise<void> {
        await this.game.waitUntilPlaceBet();

        await this.betOn(hedgeChoices[0], amount);
        await this.betOn(hedgeChoices[1], amount);
    }

    async placeBet(choice: string, amount: number = 1): Promise<any> {
        await this.game.waitUntilPlaceBet();

        return await this.betOn(choice, amount);
    }

    async betOn(choice: string, amount: number = 1): Promise<any> {
        await this.game.clickToChoice(choice);

        return await this.game.waitForEndBet();
    }

    async placeBetSelectChipBoard(choice: string, btnaccept: string, amount: number = 1): Promise<any> {
        await this.game.waitUntilPlaceBet();
        await this.selectChipBoard(choice, btnaccept, amount);
        return await this.game.waitForEndBet();
    }

    async placeHedgeBetChipBoard(hedgeChoices: string[], btnaccept: string, amount: number = 1): Promise<void> {
        await this.game.waitUntilPlaceBet();
        await this.selectChipBoard(hedgeChoices[0], btnaccept, amount);
        await this.game.waitForTimeout(1000);
        await this.selectChipBoard(hedgeChoices[1], btnaccept, amount);
        await this.game.waitForTimeout(1000);
    }

    async selectChipBoard(choice: string, btnaccept: string, amount: number = 1): Promise<any> {
        await this.game.clickLocator(choice);
        await this.game.clickLocator(`stake${amount}`);
        await this.game.clickLocator(btnaccept);
    }

    async openHistory(): Promise<any> {
        this.game.attachSocketAndCaptureEvent(GameEvent.History);

        await this.game.clickHistory();

        return this.game.latestCaptureEvent(GameEvent.History);
    }
}
