import {test} from '../../../core/base-fixture'
import { HeroesSlotLocators } from "../locators/heroes-slot-locators";
import { HeroesSlotConfigs } from "../heroes-slot-configs";
import { IBaseOptions, SlotGameBase } from "../../../core/smoke-game-bases";

class HeroesSlotSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: IBaseOptions = {
            placeBetChoices: [HeroesSlotConfigs.choices[0]],
            gameConfiguration: HeroesSlotConfigs,
            locators: HeroesSlotLocators,
            waitBetTimeout: 1000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }

}

new HeroesSlotSmokeSpec().start();
