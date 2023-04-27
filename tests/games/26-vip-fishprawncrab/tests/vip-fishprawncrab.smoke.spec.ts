import { test, expect } from "../../../core/base-fixture";
import { GameEvent } from "../../../_shared/events";
import { VIPFPCLocators } from "../locators/vip-fishprawncrab-locators";
import { VIPFPCConfigs } from "../vip-fishprawncrab-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class VIPFPCSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [VIPFPCConfigs.choices[7]],
            gameConfiguration: VIPFPCConfigs,
            placeBetAmount: 50,
            locators: VIPFPCLocators,
            waitBetTimeout: 12000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    protected placeBetAndSettleTests(): void {
        test("THEN player able to place a bet and settle", async () => {
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            const bet = { choice: this.options.placeBetChoices[0], amount: this.options.placeBetAmount ?? 1 };
            this.game.attachSocketAndCaptureEvent(GameEvent.WinStatus);

            // Act
            const placeBetResponse = await this.player.placeBet(bet.choice, bet.amount);
            const settledResults = await this.game.waitForSettlement();
            
            // Assert
            expect(placeBetResponse.endBet).toBe(bet.amount);
            expect(settledResults.settlementResult).toMatchBetOptions(this.options.gameConfiguration.choices);
        });
    }
}

new VIPFPCSmokeSpec().start();
