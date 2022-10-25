import { SedieLocators } from "../locators/sedie-locators";
import { SedieConfigs } from "../sedie-configs";
import { ITableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class SedieSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: ITableGameOptions = {
            gameConfiguration: SedieConfigs,
            locators: SedieLocators,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new SedieSmokeSpec().start();
