import { BaccaratLocators } from "../locators/baccarat-locators";
import { BaccaratConfigs } from "../baccarat-configs";
import { IBaseOptions, GameGuideBase } from "../../../core/smoke-game-bases";

class BaccaratGameGuideSpec extends GameGuideBase {
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
new BaccaratGameGuideSpec().start();
