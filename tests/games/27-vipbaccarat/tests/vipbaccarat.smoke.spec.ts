import { VipBaccaratLocators } from "../locators/vipbaccarat-locators";
import { VipBaccaratConfigs } from "../vipbaccarat-configs";
import { ITableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class VipBaccaratSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: ITableGameOptions = {
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
