import { test, expect } from "../../../core/base-fixture";
import { GameEvent } from "../../../_shared/events";
import { LotteryLocators } from "../locators/lottery-locators";
import { LotteryConfigs } from "../lottery-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class LotterySmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [LotteryConfigs.choices[4],LotteryConfigs.choices[5]],
            gameConfiguration: LotteryConfigs,
            locators: LotteryLocators,
            waitBetTimeout: 9000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
    protected inGameDealerTests(): void {
    }

    protected placeBetAndSettleTests(): void {
        test("THEN player able to place a bet and settle", async () => {
        test.setTimeout(this.options.gameConfiguration.maxTimeout);
        await this.game.clickLocator("othersChoice")
        
        const bet = { choice: "others" , amount: 1 };
        this.game.attachSocketAndCaptureEvent(GameEvent.WinStatus);

        // Act
        const placeBetResponse = await this.player.placeBet(LotteryConfigs.hedgeBetGroups[0][0], bet.amount);
        const settledResults = await this.game.waitForSettlement();
            
        // Assert
        expect(placeBetResponse.endBet).toBe(bet.amount);
        expect(settledResults.settlementResult).toMatchBetOptions(this.options.gameConfiguration.choices);
        expect(bet).toMatchWinning(settledResults);
    });
}
}

new LotterySmokeSpec().start();
