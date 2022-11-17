import { TurboOddEvenLocators } from "../locators/turbo-oddeven-locators";
import { TurboOddEvenConfigs } from "../turbo-oddeven-configs";
import { MiniGameOptions, MiniGameBase } from "../../../core/smoke-game-bases/mini-game-base.spec";

class TurboBigSmallSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: MiniGameOptions = {
            placeBetChoices: [TurboOddEvenConfigs.choices[0]],
            placeBetAmount: 5,
            gameConfiguration: TurboOddEvenConfigs,
            locators: TurboOddEvenLocators,
            snapshotFolderPath: __filename,
            waitBetTimeout: 9000,
        };
        super(smokeOptions);
    }

}

new TurboBigSmallSmokeSpec().start();
