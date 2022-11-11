import { BaccaratLocators } from "../locators/baccarat-locators";
import { BaccaratConfigs } from "../baccarat-configs";
import { ITableGameOptions, TableGameBase } from "../../../core/smoke-game-bases/table-game-base.spec";

class BaccaratSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: ITableGameOptions = {
            placeBetChoices: [BaccaratConfigs.choices[3]],
            gameConfiguration: BaccaratConfigs,
            locators: BaccaratLocators,
            waitBetTimeout: 10000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }
}
new BaccaratSmokeSpec().start();
