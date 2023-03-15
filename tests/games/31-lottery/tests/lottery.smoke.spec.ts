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

    protected maxBetTests(): void {
        
    }

    protected placeBetAndSettleTests(): void {
        test("THEN player able to place a bet and settle", async () => {
        test.setTimeout(this.options.gameConfiguration.maxTimeout);
        await this.game.clickLocator("othersChoice")
        const bet = { choice: {group:'others',betchoice: 'big'} , amount: 1 };
        this.game.attachSocketAndCaptureEvent(GameEvent.WinStatus);

        // Act
        const placeBetResponse = await this.player.placeBet(bet.choice.betchoice, bet.amount);
        const settledResults = await this.game.waitForSettlement();
            
        // Assert
        expect(placeBetResponse.endBet).toBe(bet.amount);
        expect(settledResults.settlementResult).toMatchBetOptions(this.options.gameConfiguration.choices);
        expect(await toMatchWinning(settledResults,bet)).toBeTruthy()
    });
}
}

new LotterySmokeSpec().start();


const toMatchWinning = async (settledResults: object, bet: object) => {
    const odds = settledResults.settlementResult[bet.choice.group][ bet.choice.betchoice] ? settledResults.odds[bet.choice.group] : 0;
    const expectedAmount = bet.amount * odds;
    
    if (expectedAmount === settledResults.winAmount) {
        return true
    }
    else {
        console.log( `failed. Expected ${expectedAmount} but received ${settledResults.winAmount}`);
        return false
    }
};
