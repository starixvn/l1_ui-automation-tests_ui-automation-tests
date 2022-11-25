import {test} from '../../../core/base-fixture'
import { HeroesSlotLocators } from "../locators/heroes-slot-locators";
import { HeroesSlotConfigs } from "../heroes-slot-configs";
import { SlotGameOptions, SlotGameBase } from "../../../core/smoke-game-bases/slot-game-base.spec";

class HeroesSlotSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: SlotGameOptions = {
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
