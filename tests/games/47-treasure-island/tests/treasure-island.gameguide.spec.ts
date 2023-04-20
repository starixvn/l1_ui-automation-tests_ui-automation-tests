import { test, expect } from "../../../core/base-fixture";
import { GameEvent } from "../../../_shared/events";
import { TreasureIslandLocators } from "../locators/treasure-island-locators";
import { TreasureIslandConfigs } from "../treasure-island-configs";
import { IBaseOptions, GameGuideBase } from "../../../core/smoke-game-bases";

class TreasureIslandGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [TreasureIslandConfigs.choices[0]],
            gameConfiguration: TreasureIslandConfigs,
            locators: TreasureIslandLocators,
            waitBetTimeout: 5000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }
}

new TreasureIslandGameGuideSpec().start();
