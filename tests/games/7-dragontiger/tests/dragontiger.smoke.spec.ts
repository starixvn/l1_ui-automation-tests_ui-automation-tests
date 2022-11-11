import { DragonTigerLocators } from "../locators/dragontiger-locators";
import { DragonTigerConfigs } from "../dragontiger-configs";
import { MiniGameOptions, MiniGameBase } from "../../../core/smoke-game-bases/mini-game-base.spec";

class DragonTigerSmokeSpec extends MiniGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: MiniGameOptions = {
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
