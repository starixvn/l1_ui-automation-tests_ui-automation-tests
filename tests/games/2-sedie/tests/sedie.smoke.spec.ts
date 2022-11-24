import { SedieLocators } from "../locators/sedie-locators";
import { SedieConfigs } from "../sedie-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class SedieSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
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
