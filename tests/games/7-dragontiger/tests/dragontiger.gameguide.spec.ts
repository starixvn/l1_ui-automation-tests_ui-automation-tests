import { DragonTigerLocators } from "../locators/dragontiger-locators";
import { DragonTigerConfigs } from "../dragontiger-configs";
import { IBaseOptions, GameGuideBase } from "../../../core/smoke-game-bases";

class DragonTigerGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [DragonTigerConfigs.choices[0]],
            gameConfiguration: DragonTigerConfigs,
            locators: DragonTigerLocators,
            waitBetTimeout: 7000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new DragonTigerGameGuideSpec().start();
