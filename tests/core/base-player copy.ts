import { GameEvent } from "../_shared/events";
import { BaseGame } from "./base-game";
import { GameConfiguration } from "./game-configuration";


export class BasePlayer {
    readonly game: BaseGame;
    readonly gameConfiguration: GameConfiguration;


    constructor(game: BaseGame, gameConfiguration: GameConfiguration) {
        this.game = game;
        this.gameConfiguration = gameConfiguration;

    }

    async placeHedgeBet(hedgeChoices: string[], amount: number = 1, gameName:string = this.gameConfiguration.name): Promise<void> {
        await this.game.waitUntilPlaceBet(gameName);

        await this.betOn(hedgeChoices[0], amount,gameName);
        await this.betOn(hedgeChoices[1], amount,gameName);
    }

    async placeBet(choice: string, amount: number = 1, gameName:string = this.gameConfiguration.name): Promise<any> {
        await this.game.waitUntilPlaceBet(gameName);

        return await this.betOn(choice, amount,gameName);
    }

    async betOn(choice: string, amount: number = 1,gameName:string = this.gameConfiguration.name): Promise<any> {
        await this.game.clickToChoice(choice);

        return await this.game.waitForEndBet(gameName);
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
