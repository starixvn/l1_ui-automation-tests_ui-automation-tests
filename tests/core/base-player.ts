import { GameEvent } from "../_shared/events";
import { BaseGame } from "./base-game";

export class BasePlayer {
    readonly game: BaseGame;

    constructor(game: BaseGame) {
        this.game = game;
    }

    async placeHedgeBet(hedgeChoices: string[], amount: number = 1, subGameName?: string): Promise<void> {
        await this.game.waitUntilPlaceBet(subGameName);
        
        await this.betOn(hedgeChoices[0], amount, subGameName);
        await this.betOn(hedgeChoices[1], amount, subGameName);
    }

    async placeBet(choice: string, amount: number = 1, subGameName?: string): Promise<any> {
        await this.game.waitUntilPlaceBet(subGameName);

        return await this.betOn(choice, amount, subGameName);
    }

    async betOn(choice: string, amount: number = 1, subGameName?: string): Promise<any> {
        await this.game.clickToChoice(choice);

        if (this.game.gameConfiguration.betBoard) {
            await this.game.clickStake(amount);
            await this.game.clickSubmitBet();
        }

        return await this.game.waitForEndBet(subGameName);
    }

    async openHistory(): Promise<any> {
        this.game.attachSocketAndCaptureEvent(GameEvent.History);

        await this.game.clickHistory();

        return this.game.latestCaptureEvent(GameEvent.History);
    }

    async clickOutSide(): Promise<any> {
        await this.game.clickOutSide();
    }
}
