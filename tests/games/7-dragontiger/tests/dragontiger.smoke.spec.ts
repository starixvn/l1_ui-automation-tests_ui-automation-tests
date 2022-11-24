import { DragonTigerLocators } from "../locators/dragontiger-locators";
import { DragonTigerConfigs } from "../dragontiger-configs";
import { IBaseOptions, MiniGameBase } from "../../../core/smoke-game-bases";

class DragonTigerSmokeSpec extends MiniGameBase {
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

new DragonTigerSmokeSpec().start();
