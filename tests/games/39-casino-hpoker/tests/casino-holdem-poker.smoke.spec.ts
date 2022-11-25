import { test, expect } from "../../../core/base-fixture";
import { GameEvent } from "../../../_shared/events";
import { CasinoHoldemPokerLocators } from "../locators/casino-holdem-poker-locators";
import { CasinoHoldemPokerConfigs } from "../casino-holdem-poker-configs";
import { CardGameOptions, CardGameBase } from "../../../core/smoke-game-bases/card-game-base.spec";

class CasinoHoldemPokerSmokeSpec extends CardGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: CardGameOptions = {
            placeBetChoices: [CasinoHoldemPokerConfigs.choices[0],CasinoHoldemPokerConfigs.choices[1]],
            gameConfiguration: CasinoHoldemPokerConfigs,
            locators: CasinoHoldemPokerLocators,
            waitBetTimeout: 1000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    protected placeBetAndSettleTests(): void {
        test("THEN player able to place a bet and settle", async () => {
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            const bet = { choice: this.options.placeBetChoices[0], amount: 10 };
            this.game.attachSocketAndCaptureEvent(GameEvent.Deal);        
           
            // Act
            const placebetdeal = await this.player.placeBet(bet.choice, bet.amount);
            let result = await followCardAndSettle(this.game)  
            
            // Assert
            expect(placebetdeal.deal.totalAmount).toBe(bet.amount);
            expect(placebetdeal.deal.choices[bet.choice]).toBe(bet.amount)
            expect(result.endBet).toBe(bet.amount*3);
            expect(result.choices[bet.choice]).toBe(bet.amount)

        });
    }

}


new CasinoHoldemPokerSmokeSpec().start();


const followCardAndSettle = async (game: any) => {
    await game.attachSocketAndCaptureEvent(GameEvent.EndBet);
    await game.waitForTimeout()
    await game.clickLocator("standcard")
    await game.waitForTimeout()
    await game.clickLocator("followcard")
    await game.waitForTimeout()
    let endbet =  await game.latestCaptureEvent(GameEvent.EndBet);   
    let settledResults = {
        endBet:  endbet?.call.totalAmount ,
        choices:  endbet?.call.choices,
    }
    
    return settledResults
};
