import { test, expect } from "../../../core/base-fixture";
import { RouletteLocators } from "../locators/roulette-locators";
import { RouletteConfigs } from "../roulette-configs";
import { IBaseOptions, MiniGameBase } from "../../../core/smoke-game-bases";

class RouletteSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [RouletteConfigs.choices[0]],
            gameConfiguration: RouletteConfigs,
            locators: RouletteLocators,
            waitBetTimeout: 15000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    protected hedgeBetTests(): void {}

    protected placeBetAndSettleTests(): void {
        test("THEN player able to place a bet and settle", async () => {
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            // this.game.attachSocketAndCaptureEvent(GameEvent.WinStatus);
            const bet = { choice: RouletteConfigs.choices[0], amount: 10 };

            // Act
            const placeBetResponse = await this.player.placeBet(bet.choice, bet.amount);
            const settledResults = await this.game.waitForSettlement();

            // Assert
            expect(placeBetResponse.endBet).toBe(bet.amount);
            expect(settledResults.settlementResult).toMatchBetOptions(this.options.gameConfiguration.choices);
        });
    }

    protected ticketHistoryTests(): void {
        test("AND player could open history popup", async () => {
            // Arrange
            await this.game.waitForTimeout(this.options.waitBetTimeout);
            const historyPayload = await this.player.openHistory();

            // Act
            const historySnapshot = await this.game.captureHistory();

            // Assert
            expect(historyPayload.history.betLogs.length).toBeGreaterThan(0);
            expect(historySnapshot.image).toMatchSnapshot(historySnapshot.name);
        });
    }

    protected maxBetTests(): void {
        test("THEN player should get error when they reach max bet", async () => {
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            await this.game.waitUntilPlaceBet();
            const bet = { choice: this.options.placeBetChoices[0], amount: [this.options.placeBetAmount ?? 1, 1000] };

            // Act
            await this.game.clickToChoice(bet.choice);
            await this.game.waitForTimeout(1000);
            await this.game.clickSubmitBet();
            for (let index = 0; index < 10; index++) {
                await this.game.clickLocator(`btnRightArrow`);
                await this.game.waitForTimeout(100);
            }
            await this.game.clickToChoice(bet.choice);
            await this.game.clickSubmitBet();
            const error = await this.game.captureErrorBetLimit();

            // Assert
            expect(error.image).toMatchSnapshot(error.name);
        });
    }
}

new RouletteSmokeSpec().start();
