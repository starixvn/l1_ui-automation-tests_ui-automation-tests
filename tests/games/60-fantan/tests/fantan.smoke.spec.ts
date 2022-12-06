import { FanTanLocators } from "../locators/fantan-locators";
import { FanTanConfigs } from "../fantan-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

// import { GameConfiguration } from "../game-configuration";
// import { ImageLocator } from "../base-image-locator";

class FanTanSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            gameConfiguration: FanTanConfigs,
            placeBetChoices: [FanTanConfigs.choices[0],FanTanConfigs.choices[1]],
            waitBetTimeout: 10000,
            locators: FanTanLocators,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }

    //Remove or update these code below if you want use these test cases from base or add more test case code.
    protected override inGameDealerTests(): void {}

}

new FanTanSmokeSpec().start();
