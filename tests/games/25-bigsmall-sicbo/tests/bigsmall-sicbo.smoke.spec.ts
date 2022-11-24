import { BigSmallSicBoLocators } from "../locators/bigsmall-sicbo-locators";
import { BigSmallSicBoConfigs } from "../bigsmall-sicbo-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class BigSmallSicBoSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
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
