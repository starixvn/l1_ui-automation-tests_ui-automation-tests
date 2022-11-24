import { SedieWarLocators } from "../locators/sedie-war-locators";
import { SedieWarConfigs } from "../sedie-war-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class SedieWarSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
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
