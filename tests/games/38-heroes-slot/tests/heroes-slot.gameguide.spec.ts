import { HeroesSlotLocators } from "../locators/heroes-slot-locators";
import { HeroesSlotConfigs } from "../heroes-slot-configs";
import { GameGuideBase, IBaseOptions } from "../../../core/smoke-game-bases";

class HeroesSlotGameGuideSpec extends GameGuideBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            gameConfiguration: HeroesSlotConfigs,
            locators: HeroesSlotLocators,
            waitBetTimeout: 8000,
            placeBetChoices: [HeroesSlotConfigs.choices[0]],
            snapshotFolderPath: __filename,
        };

        super(smokeOptions);
    }
}

new HeroesSlotGameGuideSpec().start();
