import {test} from '../../../core/base-fixture'
import { BlockchainBaccaratLocators } from "../locators/blockchain-baccarat-locators";
import { BlockchainBaccaratConfigs } from "../blockchain-baccarat-configs";
import { ITableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class BlockchainBaccaratSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: ITableGameOptions = {
            placeBetChoices: [BlockchainBaccaratConfigs.choices[0]],
            gameConfiguration: BlockchainBaccaratConfigs,
            locators: BlockchainBaccaratLocators,
            waitBetTimeout: 18000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }

    protected inGameDealerTests(): void {
        test("Close game guide at first time load", async () => {
            await this.game.waitForTimeout(5000)
            await this.game.clickLocator("closeguide");
        });
       

    }
}

new BlockchainBaccaratSmokeSpec().start();
