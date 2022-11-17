import {test, expect} from '../../../core/base-fixture'
import {GameEvent} from '../../../_shared/events'
import { BitCoinMasterLocators } from "../locators/bitcoin-master-locators";
import { BitCoinMasterConfigs } from "../bitcoin-master-configs";
import { MiniGameOptions, MiniGameBase } from "../../../core/smoke-game-bases/mini-game-base.spec";

class BitCoinMasterSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: MiniGameOptions = {
            placeBetChoices: [BitCoinMasterConfigs.choices[0]],
            gameConfiguration: BitCoinMasterConfigs,
            locators: BitCoinMasterLocators,
            waitBetTimeout: 7000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    protected inGameOddsTests(): void {
        
    }
    protected inGameBetChoiceTests(): void {  
    }

    protected placeBetAndSettleTests(): void {
        test("THEN player able to place a bet and settle", async () => {
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            const bet = { choice: this.options.placeBetChoices[0], amount: 1 };
           
            let a= await this.game.waitForMessage(`"remainingTime":113`);
            // Act
            console.log('place bet',a);
            await this.game.waitForTimeout(1000)
            
            //const placeBetResponse = await this.player.placeBet(bet.choice, bet.amount);
            await this.game.clickToChoice(bet.choice);
        
            if (this.game.gameConfiguration.betBoard) {
                await this.game.clickStake( bet.amount);
                await this.game.clickSubmitBet();
            }
            const settledResults = await this.game.waitForSettlement();

            console.log(settledResults);
            
            // Assert
            // expect(placeBetResponse.endBet).toBe(bet.amount);
            // expect(settledResults.settlementResult).toMatchBetOptions(this.options.gameConfiguration.choices);
            // expect(bet).toMatchWinning(settledResults);
        });
    }
}

new BitCoinMasterSmokeSpec().start();
