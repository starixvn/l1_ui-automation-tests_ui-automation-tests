import { TurboOddEvenLocators } from "../locators/turbo-oddeven-locators";
import { TurboOddEvenConfigs } from "../turbo-oddeven-configs";
import { IBaseOptions, BalancedBettingGameBase } from "../../../core/smoke-game-bases";

class TurboBigSmallSmokeSpec extends BalancedBettingGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [TurboOddEvenConfigs.choices[0]],
            placeBetAmount: 1,
            gameConfiguration: TurboOddEvenConfigs,
            locators: TurboOddEvenLocators,
            snapshotFolderPath: __filename,
            waitBetTimeout: 9000,
        };
        super(smokeOptions);
    }
}

new TurboBigSmallSmokeSpec().start();
