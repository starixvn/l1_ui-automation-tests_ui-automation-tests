import { test, expect } from "../../../core/base-fixture";
import { GameEvent } from "../../../_shared/events";
import { TreasureIslandLocators } from "../locators/treasure-island-locators";
import { TreasureIslandConfigs } from "../treasure-island-configs";
import { SlotGameOptions, SlotGameBase } from "../../../core/smoke-game-bases/slot-game-base.spec";

class TreasureIslandSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: SlotGameOptions = {
            placeBetChoices: [TreasureIslandConfigs.choices[0]],
            gameConfiguration: TreasureIslandConfigs,
            locators: TreasureIslandLocators,
            waitBetTimeout: 1000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }

    protected placeBetAndSettleTests(): void {
        test("THEN player able to place a bet and settle", async () => {
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);

            const bet = { choice: TreasureIslandConfigs.choices[0], amount: 1 };
            this.game.attachSocketAndCaptureEvent(GameEvent.WinStatus);

            // Act
            const placeBetResponse = await this.player.placeBetSlots(bet.choice, bet.amount);
            const settledResults = await this.game.waitForSettlement();
            
            // Assert
            expect(placeBetResponse.endBet).toBe(bet.amount * parseFloat(bet.choice));
        });
    }
}

new TreasureIslandSmokeSpec().start();
