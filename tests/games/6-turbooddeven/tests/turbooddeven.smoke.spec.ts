import { TurboOddEvenLocators } from "../locators/turbooddeven-locators";
import { TurboOddEvenConfigs } from "../turbooddeven-configs";
import { MiniGameOptions, MiniGameBase } from "../../../core/smoke-game-bases/mini-game-base.spec";

class TurboBigSmallSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: MiniGameOptions = {
            placeBetChoices: [TurboOddEvenConfigs.choices[0]],
            gameConfiguration: TurboOddEvenConfigs,
            locators: TurboOddEvenLocators,
            snapshotFolderPath: __filename,
            waitBetTimeout: 5000,
        };
        super(smokeOptions);
    }

    protected override placeBetAndSettleTests(): void {}
}

new TurboBigSmallSmokeSpec().start();
