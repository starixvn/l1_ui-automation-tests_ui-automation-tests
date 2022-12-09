import { FanTanLocators } from "../locators/fantan-locators";
import { FanTanConfigs } from "../fantan-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class FanTanSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            gameConfiguration: FanTanConfigs,
            placeBetChoices: [FanTanConfigs.choices[0], FanTanConfigs.choices[1]],
            waitBetTimeout: 10000,
            locators: FanTanLocators,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
    protected override inGameDealerTests(): void {}

}

new FanTanSmokeSpec().start();
