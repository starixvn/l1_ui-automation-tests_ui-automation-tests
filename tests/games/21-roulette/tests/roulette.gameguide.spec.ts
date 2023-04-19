import { test, expect } from "../../../core/base-fixture";
import { RouletteLocators } from "../locators/roulette-locators";
import { RouletteConfigs } from "../roulette-configs";
import { IBaseOptions, GameGuideBase } from "../../../core/smoke-game-bases";

class RouletteGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [RouletteConfigs.choices[0]],
            gameConfiguration: RouletteConfigs,
            locators: RouletteLocators,
            waitBetTimeout: 15000,
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new RouletteGameGuideSpec().start();
