import { MagicForestLocators } from "../locators/magic-forest-locators";
import { MagicForestConfigs } from "../magic-forest-configs";
import { GameGuideBase, IBaseOptions } from "../../../core/smoke-game-bases";

class MagicForestGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            gameConfiguration: MagicForestConfigs,
            locators: MagicForestLocators,
            waitBetTimeout: 8000,
            placeBetChoices: [MagicForestConfigs.choices[0]],
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new MagicForestGameGuideSpec().start();
