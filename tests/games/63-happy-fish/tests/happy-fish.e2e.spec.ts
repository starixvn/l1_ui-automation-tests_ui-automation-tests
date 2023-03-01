import { ClassicSlotLocators } from "../../../core/base-classic-slot-locator";
import { HappyFishConfigs } from "../happy-fish-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/e2e-game-bases";

class HappyFishE2ESpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const e2eOptions: IBaseOptions = {
            placeBetChoices: [HappyFishConfigs.choices[0], HappyFishConfigs.choices[1]],
            gameConfiguration: HappyFishConfigs,
            locators: ClassicSlotLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };
        super(e2eOptions);
    }
}

new HappyFishE2ESpec().start();
