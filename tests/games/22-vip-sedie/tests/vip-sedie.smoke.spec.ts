import { VipSedieLocators } from "../locators/vip-sedie-locators";
import { VipSedieConfigs } from "../vip-sedie-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class VipSedieSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [VipSedieConfigs.choices[1]],
            placeBetAmount: 10,
            waitBetTimeout: 10000,
            gameConfiguration: VipSedieConfigs,
            locators: VipSedieLocators,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new VipSedieSmokeSpec().start();
