import { HappyFishLocators } from "../locators/happy-fish-locators";
import { HappyFishConfigs } from "../happy-fish-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/smoke-game-bases";

class HappyFishSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: ["1","25"],
            gameConfiguration: HappyFishConfigs,
            locators: HappyFishLocators,
            waitBetTimeout: 1000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }
}

new HappyFishSmokeSpec().start();
