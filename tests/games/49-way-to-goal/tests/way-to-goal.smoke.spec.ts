import {test} from '../../../core/base-fixture'
import { WayToGoalLocators } from "../locators/way-to-goal-locators";
import { WayToGoalConfigs } from "../way-to-goal-configs";
import { SlotGameOptions, SlotGameBase } from "../../../core/smoke-game-bases/slot-game-base.spec";

class WayToGoalSmokeSpec extends SlotGameBase {
    /**
     *
     */
    constructor() {
        const smokeOptions: SlotGameOptions = {
            placeBetChoices: [WayToGoalConfigs.choices[0]],
            gameConfiguration: WayToGoalConfigs,
            locators: WayToGoalLocators,
            waitBetTimeout: 1000,
            snapshotFolderPath: __filename,
        };
        super(smokeOptions);
    }

}

new WayToGoalSmokeSpec().start();
