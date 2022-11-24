import { BaccaratLocators } from "../locators/baccarat-locators";
import { BaccaratConfigs } from "../baccarat-configs";
import { IBaseOptions, TableGameBase } from "../../../core/smoke-game-bases";

class BaccaratSmokeSpec extends TableGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
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
