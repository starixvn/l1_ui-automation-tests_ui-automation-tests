import { SedieLocators } from "../locators/sedie-locators";
import { SedieConfigs } from "../sedie-configs";
import { TableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class SedieSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: TableGameOptions = {
            gameConfiguration: SedieConfigs,
            locators: SedieLocators,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new SedieSmokeSpec().start();
