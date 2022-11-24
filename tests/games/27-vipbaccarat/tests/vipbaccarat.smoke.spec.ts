import { VipBaccaratLocators } from "../locators/vipbaccarat-locators";
import { VipBaccaratConfigs } from "../vipbaccarat-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class VipBaccaratSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [VipBaccaratConfigs.choices[3]],
            gameConfiguration: VipBaccaratConfigs,
            locators: VipBaccaratLocators,
            waitBetTimeout: 9000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }
}
new VipBaccaratSmokeSpec().start();
