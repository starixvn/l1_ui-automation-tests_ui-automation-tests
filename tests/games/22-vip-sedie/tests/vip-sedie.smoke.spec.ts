import { VipSedieLocators } from "../locators/vip-sedie-locators";
import { VipSedieConfigs } from "../vip-sedie-configs";
import { ITableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class VipSedieSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: ITableGameOptions = {
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
