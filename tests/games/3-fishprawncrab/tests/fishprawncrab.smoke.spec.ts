import {test, expect} from '../../../core/base-fixture'
import {GameEvent} from '../../../_shared/events'
import { FPCLocators } from "../locators/fishprawncrab-locators";
import { FPCConfigs } from "../fishprawncrab-configs";
import { MiniGameOptions, MiniGameBase } from "../../../core/smoke-game-bases/mini-game-base.spec";

class FPCSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: MiniGameOptions = {
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
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
           
            const bet = { choice: FPCConfigs.choices[3], amount: 1 };
            this.game.attachSocketAndCaptureEvent(GameEvent.WinStatus);

            // Act
            const placeBetResponse = await this.player.placeBet(bet.choice, bet.amount);
            const settledResults = await this.game.waitForSettlement();

            // Assert
            expect(placeBetResponse.endBet).toBe(5);           
            expect(settledResults.settlementResult).toMatchBetOptions(this.options.gameConfiguration.choices);
        });
    }
}

new FPCSmokeSpec().start();
