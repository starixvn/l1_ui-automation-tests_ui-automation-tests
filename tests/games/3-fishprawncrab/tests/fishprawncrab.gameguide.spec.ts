import { test, expect } from "../../../core/base-fixture";
import { GameEvent } from "../../../_shared/events";
import { FPCLocators } from "../locators/fishprawncrab-locators";
import { FPCConfigs } from "../fishprawncrab-configs";
import { IBaseOptions, GameGuideBase } from "../../../core/smoke-game-bases";

class FPCGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [FPCConfigs.choices[3]],
            gameConfiguration: FPCConfigs,
            locators: FPCLocators,
            waitBetTimeout: 10000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new FPCGameGuideSpec().start();
