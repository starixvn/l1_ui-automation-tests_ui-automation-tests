import { ClassicSlotLocators } from "../../../core/base-classic-slot-locator";
import { MagicForestConfigs } from "../magic-forest-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/e2e-game-bases";

class MagicForestE2ESpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const e2eOptions: IBaseOptions = {
            placeBetChoices: [MagicForestConfigs.choices[0], MagicForestConfigs.choices[1]],
            gameConfiguration: MagicForestConfigs,
            locators: ClassicSlotLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };
        super(e2eOptions);
    }
}

new MagicForestE2ESpec().start();
