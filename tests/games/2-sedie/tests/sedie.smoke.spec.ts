import { SedieLocators } from "../locators/sedie-locators";
import { SedieConfigs } from "../sedie-configs";
import { TableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class SedieSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: TableGameOptions = {
            placeBetChoices: [
                {
                    choice: SedieConfigs.choices[1],
                    amount: 1,
                },
            ],
            gameConfiguration: SedieConfigs,
            locators: SedieLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new SedieSmokeSpec().start();
