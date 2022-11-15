import { BigSmallSicBoLocators } from "../locators/bigsmall-sicbo-locators";
import { BigSmallSicBoConfigs } from "../bigsmall-sicbo-configs";
import { ITableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class BigSmallSicBoSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: ITableGameOptions = {
            gameConfiguration: BigSmallSicBoConfigs,
            locators: BigSmallSicBoLocators,
            waitBetTimeout: 12000,
            placeBetChoices: [BigSmallSicBoConfigs.choices[6]],
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new BigSmallSicBoSmokeSpec().start();
