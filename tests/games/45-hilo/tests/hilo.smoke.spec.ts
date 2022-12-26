import { test, expect } from "../../../core/base-fixture";
import { GameEvent } from "../../../_shared/events";
import { HiLoLocators } from "../locators/hilo-locators";
import { HiLoConfigs } from "../hilo-configs";
import { IBaseOptions, MiniGameBase } from "../../../core/smoke-game-bases";

class HiLoSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [HiLoConfigs.choices[0], HiLoConfigs.choices[1]],
            gameConfiguration: HiLoConfigs,
            locators: HiLoLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    protected hedgeBetTests(): void {}

    protected inGameBetChoiceTests(): void {
        test("AND bet choices should be displayed on table", async () => {
            // Arrange
            await this.game.waitForTimeout(this.options.waitBetTimeout);

            for (const placeBetChoice of this.options.placeBetChoices) {
                // Act
                const betChoice = await this.game.captureChoice(placeBetChoice);

                // Assert
                expect(betChoice.image).toMatchSnapshot(betChoice.name);
            }
        });
    }

    protected placeBetAndSettleTests(): void {
        test("THEN player able to place a bet and settle", async () => {
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            const bet = { choice: this.options.placeBetChoices[0], amount: 1 };

            // Act
            const settledResults = await placeBethilo(this.game, bet.choice, bet.amount);

            // // Assert
            expect(settledResults.endBet).toBe(bet.amount);
        });
    }
}

new HiLoSmokeSpec().start();

const placeBethilo = async (game: any, choice: string, amount: number) => {
    await game.attachSocketAndCaptureEvent(GameEvent.EndDeal);
    await game.clickLocator("stake" + amount);
    await game.clickLocator("startbet");
    await game.waitForTimeout(2000);
    await game.clickLocator(choice + "Choice");
    await game.waitForTimeout(2000);
    await game.clickLocator("collect");
    await game.waitForTimeout(500);
    let message = await game.latestCaptureEvent(GameEvent.EndDeal);
    let settledResults = {
        settlementResult: message?.result?.settlementResult,
        endBet: message?.result?.amount,
        winAmount: message?.result?.betwin,
    };
    return settledResults;
};
