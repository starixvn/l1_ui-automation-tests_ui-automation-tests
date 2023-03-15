import { test, expect } from "../../../core/base-fixture";
import { BitCoinMasterLocators } from "../locators/bitcoin-master-locators";
import { BitCoinMasterConfigs } from "../bitcoin-master-configs";
import { IBaseOptions, MiniGameBase } from "../../../core/smoke-game-bases";

class BitCoinMasterSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [BitCoinMasterConfigs.choices[0]],
            gameConfiguration: BitCoinMasterConfigs,
            locators: BitCoinMasterLocators,
            waitBetTimeout: 7000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    protected inGameBetChoiceTests(): void {
        test("AND bet choices should be displayed on table", async () => {
            // Arrange
            test.setTimeout(this.options.gameConfiguration.maxTimeout);
            await this.game.waitForTimeout(this.options.waitBetTimeout);

            for (const placeBetChoice of this.options.placeBetChoices) {
                // Act
                const betChoice = await this.game.captureChoice(placeBetChoice);

                // Assert
                expect(betChoice.image).toMatchSnapshot(betChoice.name);
            }
        });
        
    }

    protected ticketHistoryTests(): void {
        test("AND player could open history popup", async () => {
            // Arrange
            await this.player.openHistory();

            // Act
            const historySnapshot = await this.game.captureHistory();

            // Assert
            expect(historySnapshot.image).toMatchSnapshot(historySnapshot.name);
        });
    }

    protected placeBetAndSettleTests(): void {
        //limit feature, will implement later
    }

    protected hedgeBetTests(): void {
       //limit feature, will implement later
    }   

    protected maxBetTests(): void {
      //limit feature, will implement later
    }
}


new BitCoinMasterSmokeSpec().start();
