import { HappyFishLocators } from "../locators/happy-fish-locators";
import { HappyFishConfigs } from "../happy-fish-configs";
import { GameGuideBase, IBaseOptions } from "../../../core/smoke-game-bases";

class HappyFishGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            gameConfiguration: HappyFishConfigs,
            locators: HappyFishLocators,
            waitBetTimeout: 8000,
            placeBetChoices: [HappyFishConfigs.choices[0]],
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new HappyFishGameGuideSpec().start();
