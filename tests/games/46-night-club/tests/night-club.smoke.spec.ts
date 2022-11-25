import {test} from '../../../core/base-fixture'
import { NightClubLocators } from "../locators/night-club-locators";
import { NightClubConfigs } from "../night-club-configs";
import { SlotGameOptions, SlotGameBase } from "../../../core/smoke-game-bases/slot-game-base.spec";

class NightClubSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: SlotGameOptions = {
            placeBetChoices: [NightClubConfigs.choices[0]],
            gameConfiguration: NightClubConfigs,
            locators: NightClubLocators,
            waitBetTimeout: 1000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }

}

new NightClubSmokeSpec().start();
