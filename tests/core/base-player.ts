import { GameEvent } from "../_shared/events";
import { BaseGame } from "./base-game";

export class BasePlayer {
    readonly game: BaseGame;

    constructor(game: BaseGame) {
        this.game = game;
    }

    async placeBet(choice: string, amount: number = 1): Promise<any> {
        await this.game.waitUntilPlaceBet();

        await this.game.clickToChoice(choice);
        return await this.game.waitForEndBet();
    }

    async placeHedgeBet(hedgeChoices: string[], amount: number = 1): Promise<void> {
        await this.game.waitUntilPlaceBet();

        await this.game.clickToChoice(hedgeChoices[0]);
        await this.game.waitForEndBet();

        await this.game.clickToChoice(hedgeChoices[1]);
        await this.game.waitForEndBet();
    }

    async openHistory(): Promise<any> {
        this.game.attachSocketAndCaptureEvent(GameEvent.History);

        await this.game.clickHistory();

        return this.game.latestCaptureEvent(GameEvent.History);
    }
}
