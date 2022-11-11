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
            waitBetTimeout: 5000,
            placeBetChoices: [SedieConfigs.choices[0]],
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new SedieSmokeSpec().start();
