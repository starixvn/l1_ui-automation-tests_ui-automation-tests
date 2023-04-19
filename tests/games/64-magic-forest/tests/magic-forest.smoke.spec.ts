import { MagicForestLocators } from "../locators/magic-forest-locators";
import { MagicForestConfigs } from "../magic-forest-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/smoke-game-bases";

class MagicForestSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [MagicForestConfigs.choices[0]],
            gameConfiguration: MagicForestConfigs,
            locators: MagicForestLocators,
            waitBetTimeout: 1000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }
}

new MagicForestSmokeSpec().start();
