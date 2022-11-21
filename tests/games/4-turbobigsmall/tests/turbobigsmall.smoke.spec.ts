import { TurboBigSmallLocators } from "../locators/turbobigsmall-locators";
import { TurboBigSmallConfigs } from "../turbobigsmall-configs";
import { IBaseOptions, BalancedBettingGameBase } from "../../../core/smoke-game-bases";

class TurboBigSmallSmokeSpec extends BalancedBettingGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [TurboBigSmallConfigs.choices[0]],
            gameConfiguration: TurboBigSmallConfigs,
            locators: TurboBigSmallLocators,
            snapshotFolderPath: __filename,
            waitBetTimeout: 5000,
        };
        super(smokeOptions);
    }
}

new TurboBigSmallSmokeSpec().start();
