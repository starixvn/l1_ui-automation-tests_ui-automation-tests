import { test, expect } from "../../../core/base-fixture";
import { GameEvent } from "../../../_shared/events";
import { FPCLocators } from "../locators/fishprawncrab-locators";
import { FPCConfigs } from "../fishprawncrab-configs";
import { IBaseOptions, MiniGameBase } from "../../../core/smoke-game-bases";

class FPCSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [FPCConfigs.choices[3]],
            gameConfiguration: FPCConfigs,
            locators: FPCLocators,
            waitBetTimeout: 10000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
    protected override hedgeBetTests(): void {}

    protected placeBetAndSettleTests(): void {
        test("THEN player able to place a bet and settle", async () => {
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            const bet = { choice: this.options.placeBetChoices[0], amount: this.options.placeBetAmount ?? 1 };
            this.game.attachSocketAndCaptureEvent(GameEvent.WinStatus);

            // Act
            const placeBetResponse = await this.player.placeBet(bet.choice, bet.amount);
            const settledResults = await this.game.waitForSettlement();
            
            // Assert
            // expect(placeBetResponse.endBet).toBe(bet.amount);
            expect(settledResults.settlementResult).toMatchBetOptions(this.options.gameConfiguration.choices);
        });
    }
}

new FPCSmokeSpec().start();
