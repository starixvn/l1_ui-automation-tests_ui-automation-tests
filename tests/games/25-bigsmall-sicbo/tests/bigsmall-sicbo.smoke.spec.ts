import { SedieWarLocators } from "../locators/bigsmall-sicbo-locators";
import { SedieWarConfigs } from "../sedie-war-configs";
import { ITableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class SedieWarSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: ITableGameOptions = {
            gameConfiguration: SedieWarConfigs,
            locators: SedieWarLocators,
            waitBetTimeout: 10000,
            placeBetChoices: [SedieWarConfigs.choices[0]],
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new SedieWarSmokeSpec().start();
