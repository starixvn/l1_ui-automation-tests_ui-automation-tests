import { BigSmallLocators } from "../locators/bigsmall-locators";
import { BigSmallConfigs } from "../bigsmall-configs";
import { IBaseOptions, BalancedBettingGameBase } from "../../../core/smoke-game-bases";

class BigSmallSmokeSpec extends BalancedBettingGameBase {
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [BigSmallConfigs.choices[0]],
            gameConfiguration: BigSmallConfigs,
            locators: BigSmallLocators,
            waitBetTimeout: 10000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new BigSmallSmokeSpec().start();
