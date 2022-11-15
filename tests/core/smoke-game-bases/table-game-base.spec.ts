import { test, expect } from "../base-fixture";
import { BasePlayer, BaseGame } from "..";
import IBaseOptions from "./base-options";
import { MiniGameBase } from "./mini-game-base.spec";

export interface ITableGameOptions extends IBaseOptions {
    waitBetTimeout: number;
    placeBetChoices: string[];
}

export class TableGameBase extends MiniGameBase {
    game: BaseGame;
    player: BasePlayer;

    constructor(protected options: ITableGameOptions) {
        super(options);
    }

    protected inGameDealerTests() {
        test("GIVEN player joined game and saw dealer", async () => {
            // Act
            const dealerSnapshot = await this.game.captureDealer();

            // Assert
            expect(dealerSnapshot.image).toMatchSnapshot(dealerSnapshot.name);
        });
    }


    protected override runScenario(): void {
        this.inGameDealerTests();

        super.runScenario();
    }
}
