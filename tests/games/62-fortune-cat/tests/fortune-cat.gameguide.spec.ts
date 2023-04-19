import { FortuneCatLocators } from "../locators/fortune-cat-locators";
import { FortuneCatConfigs } from "../fortune-cat-configs";
import { GameGuideBase, IBaseOptions } from "../../../core/smoke-game-bases";

class FortuneCatGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            gameConfiguration: FortuneCatConfigs,
            locators: FortuneCatLocators,
            waitBetTimeout: 12000,
            placeBetChoices: [FortuneCatConfigs.choices[0]],
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new FortuneCatGameGuideSpec().start();
