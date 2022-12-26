import { FortuneCatLocators } from "../locators/fortune-cat-locators";
import { FortuneCatConfigs } from "../fortune-cat-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/smoke-game-bases";

class FortuneCatSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [FortuneCatConfigs.choices[0]],
            gameConfiguration: FortuneCatConfigs,
            locators: FortuneCatLocators,
            waitBetTimeout: 1000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }

}

new FortuneCatSmokeSpec().start();
